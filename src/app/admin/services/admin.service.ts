import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrentUser } from '@core/models/user.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<ICurrentUser[]> {
    const endpoint = `users`;
    return this.http.get<ICurrentUser[]>(`${environment.API_URL}/${endpoint}`);
  }

  public getUserById(userId: number): Observable<ICurrentUser> {
    const endpoint = `users/${userId}`;
    return this.http.get<ICurrentUser>(`${environment.API_URL}/${endpoint}`);
  }

  public addUser(payload: ICurrentUser): Observable<any> {
    const endpoint = `users`;
    return this.http.post<ICurrentUser>(
      `${environment.API_URL}/${endpoint}`,
      payload
    );
  }

  public updateUser(payload: ICurrentUser): Observable<ICurrentUser> {
    const endpoint = `users/${payload.id}`;
    return this.http.patch<ICurrentUser>(
      `${environment.API_URL}/${endpoint}`,
      payload
    );
  }

  public deleteUserById(userId: number): Observable<ICurrentUser> {
    const endpoint = `users/${userId}`;
    return this.http.delete<ICurrentUser>(`${environment.API_URL}/${endpoint}`);
  }


}
