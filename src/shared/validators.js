export default class Validators {
  static runValidators(validators, fieldName, fieldValue) {
    let messages = [];
    validators.forEach((validator) => {
      const result = validator(fieldName, fieldValue);
      if(result) {
        messages.push(result);
      }
    });

    return messages;
  }

  static isRequiredValidator(fieldName, fieldValue) {
    if(fieldValue === null || fieldValue === '') {
      return `${fieldName} is required`;
    }
    else {
      return null;
    }
  }
}