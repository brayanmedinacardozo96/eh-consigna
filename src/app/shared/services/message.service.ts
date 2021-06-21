import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Messages } from './../models/messages';

@Injectable()
export class MessageService {
  private messages: Messages;

  constructor(private http: HttpClient) {
  }

  async load(url) {
    let response: any;
    response = await this.http.get<Messages>(url)
      .toPromise()
      .then(resp => {
        this.messages = resp
        return resp;
      })
      .catch((error: any) => {
        return error.error;
      });
    return response;
  }

  getMessages(): Messages {
    return this.messages;
  }

  get(key) {
    return this.getMessages()[key] ? this.getMessages()[key] : key;
  }

}
