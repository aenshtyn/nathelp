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
 }
