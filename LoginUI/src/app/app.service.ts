import { Injectable } from '@angular/core';
import { Applications } from './Model/client';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AdminUsers } from './Model/admin-users';
import { ActivatedRoute } from '@angular/router';
import { ApplicationItem } from './Model/ApplicationItem';
import { ServerItem } from './Model/ServerItem';
import { Application } from './Model/application';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  id:number=0;

allApplicationData:any;
allApplications:any;
 constructor(private http:HttpClient) {
   this.id=0;
  }
   
  private baseUrl="http://localhost:5078/api/ServerD3/ApplicationAndServer"
  private ApiUrl = "http://localhost:5078/api/ServerD3";
  private apiUrl = 'http://localhost:5078/api/ApplicationD3';
 baseServerUrl="https://localhost:5001/api/Application" ;
 appServerUrl="http://localhost:5078/AdminApp";
 AdminUrl ="http://localhost:5078/api/Admin"
 clientUrl="http://localhost:5078/api/Client";

 
 //GET APPLICATION for Admin
 getApplications(){
   return this.http.get("http://localhost:5078/AdminApp");
 }

 //get specific application for edit

 getApp(id:number):Observable<Applications>{
   return this.http.get<Applications>(`http://localhost:5078/api/Client/${id}`);
 }

 GetByID(id:number):Observable<Applications>{
  return this.http.get<Applications>(`http://localhost:5078/api/Client/${id}`);
}

 //update app for client

 updateApp(id: number, updateAppReq: Applications):Observable<Applications>{
   return this.http.put<Applications>("http://localhost:5078/api/Client/" + id, updateAppReq);
 }
 //getting all users data
 
 getAll():Observable<AdminUsers[]>
 {
   return this.http.get<AdminUsers[]>(this.AdminUrl);
 }

 //GET APPLICATION DETAILS
 getApplicationData(){
   return this.http.get("https://localhost:5001/api/Application");
 }

 //GET APPLICATION for Client Controller
getApplicationC(){
 return this.http.get("http://localhost:5078/api/Client");
}

  //post data for client
AddApplications(addApp:Applications):Observable<Applications>
{
 addApp.C_Id=0;
 return this.http.post<Applications>("http://localhost:5078/api/Client",addApp);
}

//delete applications for client
deleteApplications(id: number): Observable<Applications> {
 return this.http.delete<Applications>(`http://localhost:5078/api/Client/${id}`);
}
//delete for admin
deleteAdminApp(id: number): Observable<Applications> {
 return this.http.delete<Applications>(`http://localhost:5078/AdminApp/${id}`);
}

//edit application
editApplications(c_Id: number, updatedData: Application){
  this.http.put<Applications>(`http://localhost:5078/api/Client/`+ c_Id, updatedData).subscribe();
 }

//delete User

Delete(id: number): Observable<AdminUsers> {
  return this.http.delete<AdminUsers>(`http://localhost:5078/api/Admin/${id}`);
 }

 
 //get applicationlist
 getAllApplicationList(): Observable<ApplicationItem[]> {
  return this.http.get<ApplicationItem[]>(`${this.apiUrl}`); // Replace with your API endpoint
}

//get server list

getServers(): Observable<ServerItem[]> {
  return this.http.get<ServerItem[]>(`${this.ApiUrl}`);
}

getAppServer(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}`);
}

// editUser(loginId: number, updatedData: Alluser) {
//   this.http.put<Alluser>(`http://localhost:5078/api/Admin/`+ loginId, updatedData)
//   .subscribe();
//  }



// Function to get elements by user email from the backend
// getElementsByUserEmail(EmailId: string): Observable<any[]> {
//   const url = `http://localhost:5078/AdminApp/elements?EmailId=${EmailId}`;
//   return this.http.get<any[]>(url);
// }

// Function to get elements by user email from the backend

getElementsByUserEmail(emailId: string): Observable<any[]> {

  return this.http.get<any[]>(`${this.clientUrl}/clientdata/` + emailId);

}

 

}




