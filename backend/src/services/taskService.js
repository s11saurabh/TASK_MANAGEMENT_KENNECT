const Task = require('../models/Task');
const { calculateHoursDifference, calculateTimeLapsed, calculateTimeLeft } = require('../utils/dateHelpers');

class TaskService {
  async getTasks(userId, filters = {}, sort = {}, page = 1, limit = 10) {
    const query = { user: userId };

    
    if (filters.priority) query.priority = filters.priority;
    if (filters.status) query.status = filters.status;

   
    const sortObj = {};
    if (sort.startTime) sortObj.startTime = sort.startTime;
    if (sort.endTime) sortObj.endTime = sort.endTime;

    const options = {
      sort: sortObj,
      skip: (page - 1) * limit,
      limit: parseInt(limit)
    };

    const [tasks, total] = await Promise.all([
      Task.find(query, null, options),
      Task.countDocuments(query)
    ]);

    return {
      tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    };
  }

  async createTask(taskData, userId) {
    const task = new Task({
      ...taskData,
      user: userId
    });
    await task.save();
    return task;
  }

  async updateTask(taskId, userId, updates) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new Error('Task not found');
    }

   
    if (updates.status === 'finished' && task.status !== 'finished') {
      updates.endTime = new Date();
    }

    Object.assign(task, updates);
    await task.save();
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async getTaskWithTimeMetrics(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new Error('Task not found');
    }

    return {
      ...task.toObject(),
      timeLapsed: calculateTimeLapsed(task.startTime),
      timeLeft: task.status === 'finished' ? 0 : calculateTimeLeft(task.endTime),
      totalTime: calculateHoursDifference(task.startTime, task.endTime)
    };
  }
}

module.exports = new TaskService();