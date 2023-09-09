import { Injectable, reflectComponentType } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application } from '../Model/application';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isFormRecord } from '@angular/forms';


//import{GetAllEmployeeResponse} from '../Models/api-models/getallstudentresponse.models'

@Injectable({
  providedIn: 'root',
})
export class loginService {
  [x: string]: any;

  public userPayload:any;
  constructor(private httpClient: HttpClient,private jwtHelper: JwtHelperService ) {
    this.userPayload =this.decodeToken();
  }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  AdminUrl = 'http://localhost:5078/api/Admin/';
  baseApiUrl = 'http://localhost:5078/api/';

  //constructor(private httpClient: HttpClient) {}


  SignUpUser(user: any) {
    return this.httpClient.post(
      this.baseApiUrl + 'Login/SignUp',
      {

        Name: user[0],
        EmailId: user[1],
        Password: user[2],
        Role : user[3]
      },
      {
        responseType: 'text',
      }
    );
  }
  login(model: any){
     return this.httpClient.post (this.baseApiUrl + 'Login/LoginAsync',model);

  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }



  getToken() {
    return localStorage.getItem('token');
  }
 

  decodeToken() {
    try {
      const token = this.getToken();
      if (token && !this['jwtHelper'].isTokenExpired(token)) {
        return this['jwtHelper'].decodeToken(token);
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  // isTokenExpired(token: string): boolean {
  //   const decodedToken = this.decodeToken(token);
  //   if (!decodedToken) {
  //     return true; // Treat as expired if decoding fails
  //   };

  getgivenNameFromToken(){
   if (this.userPayload)
   return this.userPayload.name;
  }

  
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  removeToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("EmailId");
    localStorage.removeItem("Role");
}


//   loginUser(loginInfo:Array<String>){

//     return this.httpClient.post(

//       this.baseApiUrl + 'Login/LoginAsync',

//       {
//         EmailId: loginInfo[0],
//         Password: loginInfo[1]

//       },
//       {
//         responseType: 'text',
//       }

//       );
// }

}
