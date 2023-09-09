import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { loginService } from 'src/app/service/login.service';
import { AppService } from '../app.service';
import { AdminUsers } from '../Model/admin-users';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-alluserdetails',
  templateUrl: './alluserdetails.component.html',
  styleUrls: ['./alluserdetails.component.css']
})
export class AlluserdetailsComponent implements OnInit{

  
  title = 'AngularHttpRequest';
  allUsers: any;
  editMode: boolean = false;
  currentUserId!: number;
  @ViewChild('userForm')
  form!: NgForm;
  // displayedColumns: string[] = ['loginId', 'name', 'emailId', 'role', 'actions'];
  constructor(private router:Router, private api: AppService,private http:HttpClient) {}


  ngOnInit(): void {this.api.getAll().subscribe(x => {
    this.allUsers = x;
  })
  }
  
  onUserCreate(allusers: { name: string, emailId: string, password:string, role: string}) {
    console.log(allusers);
    const headers = new HttpHeaders({ 'myHeader': 'app' });
    this.http.post('http://localhost:5078/api/Login/SignUp', allusers, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        alert("Application Details Added !!");
        let ref = document.getElementById('clear');
        ref?.click();
        this.getAllData();
      });
}

  getAllData() {
    this.api.getAll().subscribe(res => {
      this.allUsers = res;
    })
  }

  deleteApplication(loginId: number) {
    this.api.Delete(loginId).subscribe(res => {
      alert("User Record Deleted ")
      this.getAllData();//quick refresh the data
    })
  }

  // onEditClicked(loginId: number) {
  //   this.currentUserId= loginId;
  //   //Get application based on id
  //   let currentUser = this.allUsers.find((a: any) => { return a.loginId === loginId });
  //   //console.log(this.form);
  //   //Populate the form with the application details
  //   this.form.setValue({
  //     name: currentUser.name,
  //     emailId: currentUser.emailId,
  //     role: currentUser.role,
  //   });


    //Change the button value to update application

  //   this.editMode = true;


  // }


}