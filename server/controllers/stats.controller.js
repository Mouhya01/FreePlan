import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import Client from '../models/client.model.js';
import Invoice from '../models/invoice.model.js';

// GET /api/stats
export const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      doneTasks,
      overdueTasks,
      totalClients,
      paidInvoices,
      pendingInvoices,
    ] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Project.countDocuments({ owner: userId, status: 'in-progress' }),
      Project.countDocuments({ owner: userId, status: 'completed' }),
      Task.countDocuments({ owner: userId }),
      Task.countDocuments({ owner: userId, status: 'done' }),
      Task.countDocuments({
        owner: userId,
        status: { $ne: 'done' },
        dueDate: { $lt: now },
      }),
      Client.countDocuments({ owner: userId }),
      // Sum of all paid invoices
      Invoice.aggregate([
        { $match: { owner: userId, status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      // Sum of all sent invoices
      Invoice.aggregate([
        { $match: { owner: userId, status: 'sent' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

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
        clients: { total: totalClients },
        revenue: {
          paid: paidInvoices[0]?.total ?? 0,
          pending: pendingInvoices[0]?.total ?? 0,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};