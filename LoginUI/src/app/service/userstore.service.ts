import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class UserstoreService  {
  
private givenName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");



  constructor() { }
   
   public getRoleFromStore(){
    return this.role$.asObservable();
   } 
  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getgivenNameFromStore(){
    return this.givenName$.asObservable();
  }

  public setgivenNameForStore(givenName:string){
    this.givenName$.next(givenName);
  }
  
  
}
