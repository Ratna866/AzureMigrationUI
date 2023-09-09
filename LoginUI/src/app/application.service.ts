import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from './Model/application';
 // Assuming you have a model named Application

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = '/api/Application'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }
}
