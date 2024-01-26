import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(baseUrl + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(baseUrl + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(baseUrl + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(baseUrl + 'admin', { responseType: 'text' });
  }
}
