import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalConstants} from '../global-constants';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  async get(path: string) {
    let response: any;
    GlobalConstants.showLoading = true;
    response = await this.http.get<any>(path)
      .toPromise()
      .then(resp => {
        GlobalConstants.showLoading = false;
        return resp;
      })
      .catch((error: any) => {
        GlobalConstants.showLoading = false;
        return error.error;
      });
    return response;
  }

  async post(path: string, params: object, headers: HttpHeaders = null) {
    let response: any;
    GlobalConstants.showLoading = true;
    response = await this.http.post(path, params, {headers: headers})
      .toPromise()
      .then(resp => {
        GlobalConstants.showLoading = false;
        return resp;
      })
      .catch((error: any) => {
        GlobalConstants.showLoading = false;
        return error.error;
      });
    return response;
  }

}
