
import { Application } from '../Model/application';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AppService } from '../app.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Applications } from '../Model/client';
import { loginService } from '../service/login.service';
import { UserstoreService } from '../service/userstore.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['clientId','clientEmail','applicationName','serverInfo','portInfo','actions'];

  public users:any=[];
  public givenName:string=""
  formValue !: FormGroup
  allApplications:any;
  editMode: boolean = false;
  currentApplicationId!: number;
  @ViewChild('applicationForm')
  form!: NgForm;
  application : Applications =new Applications;

addApp:Applications={
   
  C_Id:0,
  C_Email: '',
  Application_Name: '',
  ServerInfo: '',
  PortInfo: ''
}


  
  allApplicationData:any;
  userStore: any;

  

  constructor(private service:AppService,private router:Router,
    private auth:loginService,private user: UserstoreService , private http: HttpClient){
   
  }

  

  ngOnInit(): void {

      this.fetchApplicationData();
      this.service.getApplications().subscribe(x => {
        this.allApplications = x;
      })
      // this.userStore.getgivenNameFromStore()
      // .subscribe((val:any)=>{
      //   let givenNameFromToken = this.auth.getgivenNameFromToken();
      //   this.givenName=val || givenNameFromToken
      // })
   
  }

  fetchApplicationData(): void {
    this.service.getApplications().subscribe(
      data => {
        console.log('Fetched data:', data);
        this.allApplicationData = data;
        console.log('allApplicationData:', this.allApplicationData);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }


  // deleteApplication(id:number){
  //   this.http.deleteApplications(id).subscribe(res=>{
  //     alert("Application Record Deleted ")
  //     this.fetchApplicationData();//quick regresh the data
  //   })
  // }
  update(id:number){
    this.router.navigate(['appEdit',id])
    
  }



  onApplicationCreate(application: { C_Email: string, Application_Name: string, Serverinfo: string, Portinfo: string }) {
    if(!this.editMode){
    console.log(application);
    const headers = new HttpHeaders({ 'myHeader': 'app' });
    this.http.post('http://localhost:5078/api/Client', application, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        alert("Application Details Added !!");
        let ref = document.getElementById('clear');
        ref?.click();
        this.getAllData();
      });
  }
  else
  {
  this.service.editApplications(this.currentApplicationId, application);
  alert("Application Details Updated !!");
        let ref = document.getElementById('clear');
        ref?.click();
        this.getAllData();
  }
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

searchText: string = '';




}

