import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

 

import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../app.service';

import { NgModel } from '@angular/forms';

import { Applications } from '../Model/client';

import { FormsModule } from '@angular/forms';

import { AdminUsers } from '../Model/admin-users';

import { loginService } from '../service/login.service';

 

@Component({

  selector: 'app-client',

  templateUrl: './client.component.html',

  styleUrls: ['./client.component.css']

})

export class ClientComponent implements OnInit{

  clientEmail: string | null = localStorage.getItem('emailId');

 

  userElements: any[] = [];

  title ='post api';

  formValue !: FormGroup

  allApplications:any;

  application : Applications =new Applications;

 

addApp:Applications[]=[{

   

  C_Id:0,

  C_Email: '',

  Application_Name: '',

  ServerInfo: '',

  PortInfo: ''

}]

 

  constructor(private http:AppService, private router:Router, private auth:loginService){ }

 

  ngOnInit(): void {

    this.refreshList();

 

 

    if (this.clientEmail) {

      // Get elements by user email from the backend

      this.http.getElementsByUserEmail(this.clientEmail).subscribe({

        next: (elements) => {

          this.userElements = elements;

          console.log(this.userElements)

 

        },

        error: (error) => {

          console.error('Error fetching user elements:', error);

        }

    });

 

 

    // console.log(this.applicationForm);

    //get application method for table

    // this.http.getApplications().subscribe(x=>{

    //   this.allApplications=x;

    // })

 

 

  }

}

  refreshList(){

    this.http.getApplications().subscribe(data=>{

      this.allApplications=data;

      console.log(this.allApplications)

    });

}

 

//old add application code

//   applicationForm = new FormGroup({

//     c_Id:new FormControl(""),

//     c_Name:new FormControl(""),

//     application_Name:new FormControl(""),

//     serverinfo:new FormControl(""),

//     portinfo:new FormControl(""),

//    });

//     AddApplications(){

//    this.http.AddApplications().subscribe({

//     next:(application)=>{

//       console.log(application);

//     }

//    });

 

 

// }

 

 

 

   getAllData(){

    this.http.getApplications().subscribe(res=>{

      this.allApplications=res;

    })

  }

 

 

 

// addApplicationData(){

//   this.http.AddApplications(this.addApp)

//   .subscribe({

//     next:(app:any)=>{

//       console.log(app);

//       alert("Application Details Added !!");

//        let ref =document.getElementById('clear');

//        ref?.click();

//        this.formValue.reset();

//        this.getAllData();//quick refresh the data

//     }

 

//   }

 

//   )

// }

 

 

// onEdit(id: number) {

//   this.http.updateApp(id, this.application).subscribe(

//     () => {

//       alert("Successfully edited!");

//       this.getAllData();

//     },

//     error => {

//       console.error("Error editing applications:", error);

//     }

  //);

 

update(id:number){

  this.router.navigate(['appEdit',id])

 

}

 

logOut(){

  this.auth.removeToken();

  this.router.navigateByUrl('');

  }

 

}

 