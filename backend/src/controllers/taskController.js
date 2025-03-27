// const Task = require('../models/Task');

// const taskController = {
//   // Get all tasks for a user
//   getTasks: async (req, res) => {
//     try {
//       const { priority, status, sort, page = 1, limit = 10 } = req.query;
//       const query = { user: req.user.id };

//       // Add filters if provided
//       if (priority) query.priority = priority;
//       if (status) query.status = status;

//       // Create sort object
//       let sortObj = {};
//       if (sort === 'startTime:asc') sortObj.startTime = 1;
//       if (sort === 'startTime:desc') sortObj.startTime = -1;
//       if (sort === 'endTime:asc') sortObj.endTime = 1;
//       if (sort === 'endTime:desc') sortObj.endTime = -1;

//       const tasks = await Task.find(query)
//         .sort(sortObj)
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .exec();

//       const count = await Task.countDocuments(query);

//       res.json({
//         tasks,
//         totalPages: Math.ceil(count / limit),
//         currentPage: page
//       });
//     } catch (error) {
//       console.error('Get tasks error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   // Create a new task
//   createTask: async (req, res) => {
//     try {
//       const { title, startTime, endTime, priority, status } = req.body;

//       const task = new Task({
//         title,
//         startTime,
//         endTime,
//         priority,
//         status,
//         user: req.user.id
//       });

//       await task.save();
//       res.status(201).json(task);
//     } catch (error) {
//       console.error('Create task error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   // Update a task
//   updateTask: async (req, res) => {
//     try {
//       const { title, startTime, endTime, priority, status } = req.body;
//       const taskId = req.params.id;

//       const task = await Task.findOne({ _id: taskId, user: req.user.id });
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found' });
//       }

//       // Update fields
//       if (title) task.title = title;
//       if (startTime) task.startTime = startTime;
//       if (endTime) task.endTime = endTime;
//       if (priority) task.priority = priority;
//       if (status) task.status = status;

//       // If marking as finished, update endTime to current time
//       if (status === 'finished' && task.status !== 'finished') {
//         task.endTime = new Date();
//       }

//       await task.save();
//       res.json(task);
//     } catch (error) {
//       console.error('Update task error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   // Delete a task
//   deleteTask: async (req, res) => {
//     try {
//       const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found' });
//       }

//       await task.remove();
//       res.json({ message: 'Task removed' });
//     } catch (error) {
//       console.error('Delete task error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },

//   // Get a single task
//   getTask: async (req, res) => {
//     try {
//       const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found' });
//       }

//       res.json(task);
//     } catch (error) {
//       console.error('Get task error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   }
// };

// module.exports = taskController;



const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const { priority, status, sort } = req.query;
    const query = { user: req.user.id };

    // Add filters if provided
    if (priority) query.priority = Number(priority);
    if (status) query.status = status;

    // Create sort object
    let sortQuery = {};
    if (sort) {
      const [field, order] = sort.split('_');
      sortQuery[field] = order === 'asc' ? 1 : -1;
    }

    const tasks = await Task.find(query).sort(sortQuery);

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    // Create task
    const task = await Task.create({
      title,
      startTime,
      endTime,
      priority,
      status,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    let task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // If task is being marked as finished, update the end time
    if (status === 'finished' && task.status !== 'finished') {
      task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title,
          startTime,
          endTime: new Date(),
          priority,
          status
        },
        { new: true, runValidators: true }
      );
    } else {
      task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          title,
          startTime,
          endTime,
          priority,
          status
        },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to delete it'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await Task.aggregate([
      // Match tasks for the current user
      { $match: { user: userId } },
      // Group by status and calculate counts
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgTime: {
            $avg: {
              $subtract: [
                { $dateFromString: { dateString: '$endTime' } },
                { $dateFromString: { dateString: '$startTime' } }
              ]
            }
          }
        }
      }
    ]);

    const pendingTasks = stats.find(stat => stat._id === 'pending') || { count: 0 };
    const completedTasks = stats.find(stat => stat._id === 'finished') || { count: 0 };
    const totalTasks = pendingTasks.count + completedTasks.count;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        pendingTasks: pendingTasks.count,
        completedTasks: completedTasks.count,
        completionRate: totalTasks ? (completedTasks.count / totalTasks) * 100 : 0,
        averageCompletionTime: completedTasks.avgTime ? completedTasks.avgTime / (1000 * 60 * 60) : 0 
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task statistics',
      error: error.message
    });
  }
};

module.exports = exports;