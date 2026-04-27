import Task from '../models/task.model.js';
import Project from '../models/project.model.js';

// Verify project exists and belongs to user
const checkProjectOwnership = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });
  return project;
};

// GET /api/projects/:projectId/tasks
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority } = req.query;

    const project = await checkProjectOwnership(
      req.params.projectId,
      req.user._id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const filter = { project: req.params.projectId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/projects/:projectId/tasks
export const createTask = async (req, res, next) => {
  try {
    const project = await checkProjectOwnership(
      req.params.projectId,
      req.user._id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const task = await Task.create({
      ...req.body,
      project: req.params.projectId,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// PUT /api/projects/:projectId/tasks/:taskId
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.taskId,
        project: req.params.projectId,
        owner: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:projectId/tasks/:taskId
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      project: req.params.projectId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};