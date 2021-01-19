import { Injectable } from '@angular/core';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { User } from 'src/interface/user';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from  'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private referenceService: ReferenceService,
    private httpClient: HttpClient
    ) {}

login(user: User): Observable<Object[]> {
  return this.httpClient.get<Object[]>(this.referenceService.getHttpAddr()+"login/token.php?username="+user.username+"&service=moodle_mobile_app&password="+user.password)
  .pipe(
    tap(res => this.referenceService.setToken(res))
  );
}
}