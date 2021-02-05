import {environment} from "../../environments/environment";

export class Auth {

  public static login(token) {
    localStorage.setItem('token_consignas', atob(token));
  }

  public static getLogin() {

    const token = localStorage.getItem('token_consignas');
    if (token == null) {
      return null;
    }
    const tokenParse = JSON.parse(token);

    if (tokenParse) {
      if (tokenParse.key === environment.keyTransverseSecurity) {
        return tokenParse;
      }
    }

    return null;

  }

  public static getNameUser() {
    const token = this.getLogin();
    const person = token.user_data.person;
    let nombreUsuario = `${person.first_name} `;
    nombreUsuario += `${person.second_name != null && person.second_name != undefined && person.second_name != '' ? person.second_name : '' } `;
    nombreUsuario += `${person.first_lastname != null && person.first_lastname != undefined && person.first_lastname != '' ? person.first_lastname : '' } `;
    nombreUsuario += `${person.second_lastname != null && person.second_lastname != undefined && person.second_lastname != '' ? person.second_lastname : ''}`;
    return `${nombreUsuario}`;
  }

  public static getUser() {
    const token = this.getLogin();
    return token.user_data.user;
  }

  public static getDataApp() {
    const token = this.getLogin();
    return token.data_app;
  }

  public static getActions() {
    const token = this.getLogin();
    return token.actions;
  }

  public static logout() {
    localStorage.removeItem('token_consignas');
  }

  public static getUserDataPerson() {
    const token = this.getLogin();
    if (token != null) {
      const person = token.user_data.person;
      return person;
    }

  }

}
