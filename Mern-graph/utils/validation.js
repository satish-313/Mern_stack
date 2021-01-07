module.exports.inputValidation = (username,email,password,confirmPassword) => {
  const errors = {}
  if(username.trim().length < 7){
    errors.username = "username must be 7 digit long"
  }

  if(email.trim() === ''){
    errors.email = "must fill the email field"
  }
  else{
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(regEx)){
      errors.email = "Email must be valid email address"
    }
  }

  if(password.trim().length < 7 ){
    errors.password = "password must 7 length"
  }
  else if(password !== confirmPassword){
    errors.password = "password must be match"
  }

  return{
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username,password) => {
  const errors = {}
  if(username.trim().length < 7){
    errors.username = "username must be 7 digit long"
  }
  if(password.trim().length < 7 ){
    errors.password = "password must 7 length"
  }
  return{
    errors,
    valid: Object.keys(errors).length < 1
  }
}
