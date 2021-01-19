import { Injectable } from '@angular/core';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameslistService {

  constructor(
    private referenceService: ReferenceService,
    private httpClient: HttpClient
    ) {}

  getEscapeListForAStudent(token: string): Observable<Object[]> {
      return this.httpClient.get<Object[]>(
        this.referenceService.getHttpAddr()
        +"/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=mod_escape_get_all_escapes&wstoken="
        +token+"&moodlewssettingfilter=true");
  }

}
