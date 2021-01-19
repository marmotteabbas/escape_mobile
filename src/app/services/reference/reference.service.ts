import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  private AUTH_SERVER_ADDRESS:  string  =  'http://localhost/moodle/';
  private static token: string;
  constructor() { }

  getHttpAddr() : string {
    return this.AUTH_SERVER_ADDRESS;
  }

  setToken(token) : void {
    console.log("token is set "+ token.token)
    ReferenceService.token = token.token;
  }

  getToken() : string {
    return ReferenceService.token;
  }
}
