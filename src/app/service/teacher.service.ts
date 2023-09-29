import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';

const baseUrl = 'http://localhost:8000/api/teachers';

@Injectable({
    providedIn: 'root'
  })

export class TeacherService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(baseUrl);
    }

    get(id: any): Observable<Teacher> {
        return this.http.get('${baseUrl}/${id}');
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
      }

    update(id: any, data: any): Observable<any> {
        return this.http.put('${baseUrl}/${id}', data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete('${baseUrl}/${id}');
    }

 }
