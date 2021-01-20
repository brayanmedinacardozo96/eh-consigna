import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalConstants} from '../global-constants';
import {SnackBarClass} from '../../ui/snack-bar/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {
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

    
    // this.mensaje(response)
    return response;
  }

  async getnoLoad(path: string) {
    let response: any;
    response = await this.http.get<any>(path)
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch((error: any) => {
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

  async mensaje(response)
  {
    if(response!=undefined)
    {
        if(!response.success)
        {
          new SnackBarClass(this.snackBar,response.message, 'btn-warning').openSnackBar();

        }
    }
   
  }

}
