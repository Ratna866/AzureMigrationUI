import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../service/login.service';

@Component({
  selector: 'app-projectteam',
  templateUrl: './projectteam.component.html',
  styleUrls: ['./projectteam.component.css']
})
export class ProjectteamComponent {
  teamEmail: string | null = localStorage.getItem('emailId');

  constructor(private router: Router,
    private auth: loginService){}

  ngOnInit(){
    
  }
  logOut(){
    this.auth.removeToken();
    this.router.navigateByUrl('');
    }
}
