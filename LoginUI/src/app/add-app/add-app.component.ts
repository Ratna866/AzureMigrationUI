import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { NgModel } from '@angular/forms';
import { Applications } from '../Model/client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})

export class AddAppComponent implements OnInit{
  
  formValue !: FormGroup
  allApplications:any;
  application : Applications =new Applications;
  isAppCreated : boolean =false;
  displayMsg : string = '';
addApp:Applications={
 
  C_Id:0,
  C_Email: '',
  Application_Name: '',
  ServerInfo: '',
  PortInfo: '',
  
}

  constructor(private http:AppService, private router:Router){ }

  ngOnInit(): void {
    
   
    
    
    // console.log(this.applicationForm);
    //get application method for table
    this.http.getApplications().subscribe(x=>{
      this.allApplications=x;
    })


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

  
   
//    getAllData(){
//     this.http.getApplications().subscribe(res=>{
//       this.allApplications=res;
//     })
//   }

addApplicationData(){
  this.http.AddApplications(this.addApp)
  .subscribe({
    next:(app:any)=>{
      console.log(app);
      alert("Application Details Added !!");
      this.router.navigate(['/client']);
       let ref =document.getElementById('clear');
       ref?.click();
       this.formValue.reset();
       this.getAllData();//quick refresh the data
    }
    
  }
  
  )
}
getAllData(){
  this.http.getApplications().subscribe(res=>{
    this.allApplications=res;
  })
}

deleteApplication(id:number){
  this.http.deleteApplications(id).subscribe(res=>{
    alert("Application Record Deleted ")
    this.getAllData();//quick regresh the data
  })
}



}
