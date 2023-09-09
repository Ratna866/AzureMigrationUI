import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  allApplications: any;

  constructor(private api: AppService,private http:HttpClient) { }

  ngOnInit(): void {
    this.api.getApplications().subscribe(x => {
      this.allApplications = x;
    })
  }

}
