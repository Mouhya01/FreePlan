import Client from '../models/client.model.js';

// GET /api/clients
export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: clients.length,
      data: clients,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/clients/:id
export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
};

// POST /api/clients
export const createClient = async (req, res, next) => {
  try {
    const client = await Client.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
};

// PUT /api/clients/:id
export const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/clients/:id
export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};