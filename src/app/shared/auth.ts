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
    return `${person.first_name} ${person.second_name} ${person.first_lastname} ${person.second_lastname}`;
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
    localStorage.clear();
    sessionStorage.clear();
  }

  public static getUserDataPerson() {
    const token = this.getLogin();
    if (token != null) {
      const person = token.user_data.person;
      return person;
    }

  }

}
