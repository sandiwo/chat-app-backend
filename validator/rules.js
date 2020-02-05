class Rules {
  errors = {};

  required(name, field) {
    const trimField = String(field).trim(); 

    if(trimField.length <= 1)
      this.errors[name] = [`${name} is required.`];
  }

  min(name, field, length) {
    const trimField = String(field).trim(); 

    if(trimField.length <= length)
      this.errors[name] = [`${name} minimum ${length} characters.`];
  }

  max(name, field, length) {
    const trimField = String(field).trim(); 

    if(trimField.length >= length)
      this.errors[name] = [`${name} maximum ${length} characters.`];
  }

  email(name, field) {
    const trimField = String(field).trim(); 

    const emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(! emailFormat.test(trimField))
      this.errors[name] = [`${name} is not valid email format.`]; 
  }
  
  numeric(name, field) {
    const trimField = String(field).trim(); 

    if(! isNumeric(trimField))
      this.errors[name] = [`${name} is not valid numeric format.`];
  }
}

module.exports = Rules;