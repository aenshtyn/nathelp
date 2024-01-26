import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/auth/'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {

        const url = baseUrl + 'login/';
        const body = { email, password };

        return this.http.post(url, body, { withCredentials: true });
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(
          baseUrl + 'signup',
          {
            username,
            email,
            password,
          },
          httpOptions
        );
      }

      logout(): Observable<any> {
        return this.http.post(baseUrl + 'logout', { }, httpOptions);
      }
    }
