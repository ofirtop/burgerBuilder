export const checkValidity = (value, rule, updatedElement) =>{
    let isValid = true;

    if (rule.required) {
      isValid = value.trim() !== "" && isValid;
      updatedElement.errorMessage =
        "Please enter " + updatedElement.elementConfig.placeholder;
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
      updatedElement.errorMessage = updatedElement.elementConfig.placeholder 
      + " should be at list " + rule.minLength + " letters long";
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
      updatedElement.errorMessage =
        updatedElement.elementConfig.placeholder +
        " should be not more then " +
        rule.maxLength +
        " letters long";
    }

    if (rule.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rule.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }