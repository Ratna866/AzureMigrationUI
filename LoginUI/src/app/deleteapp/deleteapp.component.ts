import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Application } from '../Model/application';
import { Applications } from '../Model/client';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deleteapp',
  templateUrl: './deleteapp.component.html',
  styleUrls: ['./deleteapp.component.css']
})
export class DeleteappComponent {

    applicationId: number | null;
  
    deletedApplication: Applications | null;
  
    error: string;
  
   
  
    constructor(private appService: AppService) {
  
      this.applicationId = null;
  
      this.deletedApplication = null;
  
      this.error = '';
  
    }
  
   
  
    deleteApplication(): void {
  
      this.deletedApplication = null;
  
      this.error = '';
  
   
  
      this.deletedApplication = null;
  
      this.error = '';
  
      this.appService.deleteApplications(this.applicationId!)
  
        .subscribe(
  
          (deletedApp: Applications) => {
  
            this.deletedApplication = deletedApp;
  
            alert('Application deleted successfully.');
  
          },
  
          (error: any) => {
  
            this.error = error.message || 'An error occurred.';
  
            console.error('Error deleting the application:', error);
  
          }
  
        );
  
    }
  
  }