
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Application } from '../Model/application';
// export class ApiService {

//   constructor(private http: HttpClient) { }

//   getApplicationData(): Observable<Application[]> {
//     // Replace the URL with your API endpoint to fetch the application data
//     const url = 'your-api-endpoint';

//     return this.http.get<Application[]>(url);
//   }
//   getApplicationAndServer(): Observable<Application[]> {
//     // Replace the URL with your API endpoint to fetch the application data
//     const url = 'http://localhost:5078/api/ServerD3/ApplicationAndServer    ';

//     return this.http.get<Application[]>(url);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinedItem } from '../Model/CombinedData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5078/api/ServerD3/ApplicationAndServer';

  constructor(private http: HttpClient) {}

  getServerWithApplications(): Observable<CombinedItem[]> {
    return this.http.get<CombinedItem[]>(`${this.baseUrl}/ApplicationAndServer`);
  }
  
}

