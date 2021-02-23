import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
//import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  private AUTH_SERVER_ADDRESS:  string  =  'http://localhost/moodle/';
  private static token: string;
  
  public ESCAPE_PAGE_TRUEFALSE = 2;
  public ESCAPE_PAGE_CLICKINGPICTURE = 277;
  public ESCAPE_PAGE_SHORTANSWER = 1;
  public ESCAPE_PAGE_NUMERICAL = 8;
  public ESCAPE_PAGE_MULTICHOICE = 3;
  public ESCAPE_PAGE_MATCHING = 5;
  public ESCAPE_PAGE_BRANCHTABLE = 20;
 

  constructor(private storage: Storage) { }

  //Get the root server adress
  getHttpAddr() : string {
    return this.AUTH_SERVER_ADDRESS;
  }

  //Manage token of the current user
  setToken(token) : void {
    this.storage.set('token', token);
  }

  getToken() : Promise<string> {
    return this.storage.get('token');
  }

  //Manage current EscapeId for the current session
  setEscapeId(escape_id: Number) {
    this.storage.set('escapeId', escape_id);
  }

  getEscapeId(): Promise<Number>  {
    return this.storage.get('escapeId');
  }

  //Manage current Cmid for the current sessiuon
  setCmid(cmid: Number) {
    this.storage.set('cmid', cmid);
  }

  getCmid(): Promise<Number> {
    return this.storage.get('cmid');
  }

  //Manage Questions list
  setQuestionsList(QuestionsList: any) {
    this.storage.set('QuestionsList', QuestionsList);
  }

  getQuestionsList(): Promise<any> {
    return this.storage.get('QuestionsList');
  }

  clearStorage() {
    this.storage.clear();
  }
}
