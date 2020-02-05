const Rules = require('./rules');

const store = function(req, res, next) {

  const name = req.body.name; 
  const username = req.body.username; 
  const email = req.body.email; 
  const password = req.body.password; 

  let rules = new Rules();

  rules.required('name', name);
  rules.min('name', name, 3);
  rules.max('name', name, 64);

  rules.required('username', username);
  rules.min('username', username, 3);
  rules.max('username', username, 64);

  rules.required('email', email);
  rules.email('email', email);
  rules.min('email', email, 5);
  rules.max('email', email, 64);

  rules.required('password', password);
  rules.min('password', password, 5);
  rules.max('password', password, 64);

  if(Object.keys(rules.errors).length) {
    // res.jsonError(302, "Please correct input.", rules.errors);
    res.status(302).send({
      message: 'Please correct input.',
      errors: rules.errors
    })
  }

  next();
}

const update = function(req, res, next) {
  const name = req.body.name; 
  const username = req.body.username; 
  const email = req.body.email; 
  const password = req.body.password; 

  let rules = new Rules();

  rules.required('name', name);
  rules.min('name', name, 3);
  rules.max('name', name, 64);

  rules.required('username', username);
  rules.min('username', username, 3);
  rules.max('username', username, 64);

  rules.required('email', email);
  rules.email('email', email);
  rules.min('email', email, 5);
  rules.max('email', email, 64);

  if(Object.keys(rules.errors).length) {
    res.jsonError(302, "Please correct input.", rules.errors);
  }

  next();
}


module.exports = {
  store,
  update
};