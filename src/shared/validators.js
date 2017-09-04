import Utils from '../shared/utils';

export default class Validators {
  static validateForm(formFields) {
    let isValid = true;
    for (let field in formFields) {
      if(formFields[field].validators) {
        formFields[field] = this.validateField(formFields[field], field);
        isValid = isValid && formFields[field].validationState === null;
      }
    }

    return { isValid, formFields };
  }

  static validateField(field, fieldName) {
    field.errorMessages = Validators.runValidators(field.validators,
      Utils.capitalizeFirstChar(fieldName), field.value);
    field.validationState = field.errorMessages.length > 0 ? 'error' : null;
    return field;
  }

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

  static isRequired(fieldName, fieldValue) {
    if(fieldValue === null || fieldValue === '') {
      return `${fieldName} is required`;
    }
    else {
      return null;
    }
  }

  static isEmail(fieldName, fieldValue) {
    return /\S+@\S+\.\S+/.test(fieldValue) ? null : `${fieldName} must be a valid email address`;
  }
}