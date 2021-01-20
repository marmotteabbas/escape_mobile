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
}
