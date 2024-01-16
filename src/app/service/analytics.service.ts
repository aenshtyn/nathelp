import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Analytics } from '../models/analytics.model';

const baseUrl = 'http://localhost:8000/api/analytics';

@Injectable({
    providedIn: 'root'
  })

export class AnalyticsService {

    constructor(private http: HttpClient) {}

    getAnalyticsData(): Observable<any> {
        return this.http.get<any>(baseUrl);
    }

 }
