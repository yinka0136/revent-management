import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrentUser } from '@core/models/user.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public login(payload:{email: string, password: string}): Observable<any> {
    const endpoint = `users`;
    return this.http.get<ICurrentUser[]>(`${environment.API_URL}/${endpoint}`);
  }
}
