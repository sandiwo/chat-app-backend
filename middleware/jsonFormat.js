const jsonData = function(req, res, next) {
  res.jsonData = function(statusCode, message, result = {}) {
    res.status(statusCode)
      .json({
      data: {
        code: statusCode,
        message: message
      },
      result: result
    })
  }
  next();
};

const jsonStatus = function(req, res, next) {
  res.jsonStatus = function(statusCode, message) {
    res.status(statusCode)
      .json({
      data: {
        code: statusCode,
        message: message
      }
    })
  }
  next();
};

const jsonError = function(req, res, next) {
  res.jsonError = function(statusCode, message, error) {
    res.status(statusCode)
      .json({
      data: {
        code: statusCode,
        message: message
      },
      error: error
    })
  }
  next();
};

module.exports = {
  jsonStatus,
  jsonData,
  jsonError
}