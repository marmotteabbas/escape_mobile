import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  private AUTH_SERVER_ADDRESS:  string  =  'http://localhost/moodle/';
private token;
  constructor() { }

  getHttpAddr() : string {
    return this.AUTH_SERVER_ADDRESS;
  }

  setToken(token) : void {
    console.log("token is set"+ token.token)
    this.token = token;
  }
}
