import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condition } from '../models/condition.model';

const baseUrl = 'http://localhost:8000/api/conditions';

@Injectable({
    providedIn: 'root'
  })

export class ConditionService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Condition[]> {
        return this.http.get<Condition[]>(baseUrl);
    }

    get(id: any): Observable<Condition> {
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
