const Task = require('../models/Task');

const calculateTimeDiff = (startTime, endTime) => {
  return (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); 
};

const statsController = {

  getStats: async (req, res) => {
    try {
      const userId = req.user.id;
      const currentTime = new Date();

    
      const tasks = await Task.find({ user: userId });


      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.status === 'finished').length;
      const pendingTasks = totalTasks - completedTasks;

   
      let totalCompletionTime = 0;
      let finishedTasksCount = 0;
    
      const priorityStats = {
        1: { count: 0, timeLeft: 0, timeLapsed: 0 },
        2: { count: 0, timeLeft: 0, timeLapsed: 0 },
        3: { count: 0, timeLeft: 0, timeLapsed: 0 },
        4: { count: 0, timeLeft: 0, timeLapsed: 0 },
        5: { count: 0, timeLeft: 0, timeLapsed: 0 }
      };

      tasks.forEach(task => {
        if (task.status === 'finished') {
          totalCompletionTime += calculateTimeDiff(task.startTime, task.endTime);
          finishedTasksCount++;
        } else {
        
          const timeLapsed = Math.max(
            0,
            (currentTime - new Date(task.startTime)) / (1000 * 60 * 60)
          );
          
          const timeLeft = Math.max(
            0,
            (new Date(task.endTime) - currentTime) / (1000 * 60 * 60)
          );

          priorityStats[task.priority].count++;
          priorityStats[task.priority].timeLeft += timeLeft;
          priorityStats[task.priority].timeLapsed += timeLapsed;
        }
      });

      const averageCompletionTime = finishedTasksCount > 0 
        ? totalCompletionTime / finishedTasksCount 
        : 0;

      res.json({
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        averageCompletionTime,
        priorityStats: Object.entries(priorityStats).map(([priority, stats]) => ({
          priority: parseInt(priority),
          pendingCount: stats.count,
          averageTimeLeft: stats.count > 0 ? stats.timeLeft / stats.count : 0,
          averageTimeLapsed: stats.count > 0 ? stats.timeLapsed / stats.count : 0
        }))
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = statsController;