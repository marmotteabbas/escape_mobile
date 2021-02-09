import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReferenceService } from 'src/app/services/reference/reference.service';

@Injectable({
  providedIn: 'root'
})
export class GamemanagerService {

  constructor(
    private httpClient :HttpClient,
    private referenceService: ReferenceService
    ) {}

  launchrono(token: string, escapeid:string): Observable<Object[]> {
      return this.httpClient.get<Object[]>(
        this.referenceService.getHttpAddr()
        +"webservice/rest/server.php?moodlewsrestformat=json&escapeid="+escapeid+"&wsfunction=mod_escape_launch_attempt&wstoken="+
        token+"&moodlewssettingfilter=true");
  }

  getQuestionsList(token: string, escapeId: Number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(
      this.referenceService.getHttpAddr()
      +"webservice/rest/server.php?wstoken="+token+
      "&wsfunction=mod_escape_get_pages&moodlewsrestformat=json&escapeid="+escapeId);
  }

  getQuestionPage(token: string, escapeId: Number, pageid: Number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(
      this.referenceService.getHttpAddr()
      + "webservice/rest/server.php?moodlewsrestformat=json&escapeid="+escapeId
      +"&pageid="+pageid+
      "&returncontents=0&wsfunction=mod_escape_get_page_data&wstoken="+token+"&moodlewssettingfilter=true"
    );
  }

  getAnswers(token: string, escapeId: Number, pageid: Number, cmid: Number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(
      this.referenceService.getHttpAddr()
        +"webservice/rest/server.php?moodlewsrestformat=json&pageid="+pageid
        +"&cmid="+cmid
        +"&wsfunction=mod_escape_get_possible_answers_for_a_page&wstoken="+token
        +"&moodlewssettingfilter=true"
    );
  }

  AnswerQuestion(token: string, escapeId: Number, pageid: Number, answerid: Number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(
      this.referenceService.getHttpAddr()+
      "webservice/rest/server.php?wsfunction=mod_escape_answer_question&moodlewsrestformat=json"
      +"&wstoken="+token
      +"&escapeid="+escapeId
      +"&answerorid[0]="+answerid
      +"&pageid="+pageid
    );
  }
  

  ProcessPage(token: string, escapeId: Number, pageid: Number, kindofjump: Number, cmid: Number): Observable<Object[]> {
    return this.httpClient.get<Object[]>(
      this.referenceService.getHttpAddr()+
      "webservice/rest/server.php?moodlewsrestformat=json"+
      "&escapeid="+escapeId+
      "&wsfunction=mod_escape_process_page"+
      "&wstoken="+token+
      "&moodlewssettingfilter=true&"+
      "pageid="+pageid+
      "&data[0][name]=jumpto"+
      "&data[0][value]="+kindofjump+
      "&data[1][name]=id"+
      "&data[1][value]="+cmid
        );
  }
}
