const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Duplicate key (email already exists)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'This email is already registered',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages[0],
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;