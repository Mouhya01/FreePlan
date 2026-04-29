import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import Client from '../models/client.model.js';

// GET /api/stats
export const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    // Run all queries in parallel for performance
    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      doneTasks,
      overdueTasks,
      totalClients,
    ] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Project.countDocuments({ owner: userId, status: 'in-progress' }),
      Project.countDocuments({ owner: userId, status: 'completed' }),
      Task.countDocuments({ owner: userId }),
      Task.countDocuments({ owner: userId, status: 'done' }),
      // Overdue = deadline passed and task not done
      Task.countDocuments({
        owner: userId,
        status: { $ne: 'done' },
        dueDate: { $lt: now },
      }),
      Client.countDocuments({ owner: userId }),
    ]);

    // Task completion rate as a percentage
    const completionRate =
      totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
        },
        tasks: {
          total: totalTasks,
          done: doneTasks,
          overdue: overdueTasks,
          completionRate,
        },
        clients: {
          total: totalClients,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};