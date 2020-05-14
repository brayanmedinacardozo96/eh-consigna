export class Validations {
  static validateEmptyFields(form) {
    const response = {success: true, data: null};
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].required) {
          if (String(form[key].value).trim() === '' || form[key].value === null) {
            form[key].messages = 'Este campo es requerido.';
            response.success = false;
          } else {
            form[key].messages = null;
          }
        }
      }
    }
    response.data = form;
    return response;
  }
}
