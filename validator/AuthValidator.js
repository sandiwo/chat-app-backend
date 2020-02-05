const Rules = require('./rules');

const login = function(req, res, next) {

  const username = req.body.username; 
  const password = req.body.password; 

  let rules = new Rules();

  rules.required('username', username);
  rules.min('username', username, 3);
  rules.max('username', username, 64);

  rules.required('password', password);
  rules.min('password', password, 5);
  rules.max('password', password, 64);

  if(Object.keys(rules.errors).length) {
    res.jsonError(302, "Please correct input.", rules.errors);
  }

  next();
}

module.exports = {
  login,
};