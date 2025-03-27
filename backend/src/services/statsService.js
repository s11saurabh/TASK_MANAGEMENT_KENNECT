const Task = require('../models/Task');
const { calculateHoursDifference, calculateTimeLapsed, calculateTimeLeft } = require('../utils/dateHelpers');

class StatsService {
  async getTaskStats(userId) {
    const tasks = await Task.find({ user: userId });
    const currentTime = new Date();

    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'finished').length;
    const pendingTasks = totalTasks - completedTasks;

    
    const priorityStats = {
      1: { count: 0, timeLapsed: 0, timeLeft: 0 },
      2: { count: 0, timeLapsed: 0, timeLeft: 0 },
      3: { count: 0, timeLapsed: 0, timeLeft: 0 },
      4: { count: 0, timeLapsed: 0, timeLeft: 0 },
      5: { count: 0, timeLapsed: 0, timeLeft: 0 }
    };

    let totalCompletionTime = 0;
    let completedTaskCount = 0;

    tasks.forEach(task => {
      if (task.status === 'finished') {
        totalCompletionTime += calculateHoursDifference(task.startTime, task.endTime);
        completedTaskCount++;
      } else {
        const timeLapsed = calculateTimeLapsed(task.startTime);
        const timeLeft = calculateTimeLeft(task.endTime);

        priorityStats[task.priority].count++;
        priorityStats[task.priority].timeLapsed += timeLapsed;
        priorityStats[task.priority].timeLeft += timeLeft;
      }
    });

    
    Object.keys(priorityStats).forEach(priority => {
      const { count, timeLapsed, timeLeft } = priorityStats[priority];
      if (count > 0) {
        priorityStats[priority].averageTimeLapsed = timeLapsed / count;
        priorityStats[priority].averageTimeLeft = timeLeft / count;
      }
    });

    return {
      overview: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        averageCompletionTime: completedTaskCount > 0 ? totalCompletionTime / completedTaskCount : 0
      },
      priorityBreakdown: Object.entries(priorityStats).map(([priority, stats]) => ({
        priority: parseInt(priority),
        pendingCount: stats.count,
        averageTimeLapsed: stats.averageTimeLapsed || 0,
        averageTimeLeft: stats.averageTimeLeft || 0
      }))
    };
  }

  async getWeeklyStats(userId) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const tasks = await Task.find({
      user: userId,
      startTime: { $gte: oneWeekAgo }
    });

    const dailyStats = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    tasks.forEach(task => {
      const day = days[new Date(task.startTime).getDay()];
      if (!dailyStats[day]) {
        dailyStats[day] = {
          total: 0,
          completed: 0
        };
      }
      dailyStats[day].total++;
      if (task.status === 'finished') {
        dailyStats[day].completed++;
      }
    });

    return Object.entries(dailyStats).map(([day, stats]) => ({
      day,
      ...stats,
      completionRate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
    }));
  }
}

module.exports = new StatsService();