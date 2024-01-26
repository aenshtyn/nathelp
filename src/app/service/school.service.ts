import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';

const baseUrl = 'http://localhost:8000/api/schools';

@Injectable({
    providedIn: 'root'
  })

export class SchoolService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<School[]> {
        return this.http.get<School[]>(baseUrl);
    }

    get(id: any): Observable<School> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
      }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

 }
