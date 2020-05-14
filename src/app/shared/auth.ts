export class Auth {

  public static login(token) {
    localStorage.setItem('token', atob(token));
  }

  public static getLogin() {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
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

  public static logout() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

}
