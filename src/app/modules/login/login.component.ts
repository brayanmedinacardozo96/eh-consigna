import {Component, OnInit} from '@angular/core';
import {Validations} from '../../shared/validations';
import {ApiService} from '../../shared/services/api.service';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Auth} from '../../shared/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  message: null;
  form = {
    user: {
      label: 'Usuario',
      name: 'user',
      value: null,
      messages: null,
      required: true,
    },
    password: {
      label: 'Contraseña',
      name: 'password',
      value: null,
      messages: null,
      required: true,
    },
  };

  constructor(private api: ApiService,
              private router: Router) {
    const dataUser = Auth.getLogin();
    if (dataUser != null) {
      if (dataUser.user_data.id != null) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  ngOnInit(): void {
  }

  setData(name, event) {
    this.form[name].value = event;
  }

  async login() {
    const responseValidate = Validations.validateEmptyFields(this.form);
    if (!responseValidate.success) {
      return false;
    }

    const headers = new HttpHeaders({key: environment.keyTransverseSecurity});
    const params = {
      user: this.form.user.value,
      password: this.form.password.value,
    };

    const response = await this.api.post(`${environment.apiTransverseSecurity}/auth/login-user`, params, headers);
    if (!response.success) {
      this.message = response.message;
      return false;
    }
    Auth.login(response.token);
    this.router.navigate(['/mis-consignas']);

  }

  openRecoverPassword() {
    const url = environment.urlFrontendST + '/recover-password';
    window.open(url);
  }

}
