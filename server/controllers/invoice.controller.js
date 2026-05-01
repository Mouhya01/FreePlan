import Invoice from '../models/invoice.model.js';

// GET /api/invoices
export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ owner: req.user._id })
      .populate('client', 'name email company')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, total: invoices.length, data: invoices });
  } catch (err) {
    next(err);
  }
};

// POST /api/invoices
export const createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      owner: req.user._id,
    });

    // Populate client before returning
    await invoice.populate('client', 'name email company');

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
};

// PUT /api/invoices/:id
export const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('client', 'name email company');

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/invoices/:id
export const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, message: 'Invoice deleted' });
  } catch (err) {
    next(err);
  }
};