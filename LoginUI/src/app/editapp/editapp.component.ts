import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Applications } from '../Model/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.css']
})
export class EditappComponent implements OnInit{
  title = 'AngularHttpRequest';
  allApplications: any;
  editMode: boolean = false;
  currentApplicationId!: number;
  @ViewChild('applicationForm')
  form!: NgForm;

  constructor(private http: HttpClient, private service: AppService) {

  }

  ngOnInit(): void {
    this.service.getApplications().subscribe(x => {
      this.allApplications = x;
    })
  }

  onApplicationCreate(application: { C_Email: string, Application_Name: string, Serverinfo: string, Portinfo: string }) {
   
  this.service.editApplications(this.currentApplicationId, application);
  alert("Application Details Updated !!");
        let ref = document.getElementById('clear');
        ref?.click();
        this.getAllData();
  
}

  getAllData() {
    this.service.getApplications().subscribe(res => {
      this.allApplications = res;
    })
  }

  deleteApplication(id: number) {
    this.service.deleteApplications(id).subscribe(res => {
      alert("Application Record Deleted ")
      this.getAllData();//quick refresh the data
    })
  }

  onEditClicked(c_Id: number) {
    this.currentApplicationId= c_Id;
    //Get application based on id
    let currentApplication = this.allApplications.find((a: any) => { return a.c_Id === c_Id });
    //console.log(this.form);
    //Populate the form with the application details
    this.form.setValue({
      c_name: currentApplication.c_Name,
      application_Name: currentApplication.application_Name,
      serverinfo: currentApplication.serverinfo,
      portinfo: currentApplication.portinfo

    });


    //Change the button value to update application

    this.editMode = true;


  }

}
