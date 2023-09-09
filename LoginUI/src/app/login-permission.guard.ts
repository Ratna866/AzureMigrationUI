import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginPermissionGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const Role = localStorage.getItem('Role')?.replaceAll('"', '');
    if (isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Already Logged In',
      }).then((okay) => {
        if (okay) {
          if (Role == 'User') {
            this.router.navigate(['home']);
          } else if (Role == 'Client') {
            this.router.navigate(['client']);
          } else if (Role == 'Admin') {
            this.router.navigate(['admin']);
          }
          else if (Role == 'ProjectTeam') {
            this.router.navigate(['projectTeam']);
          }
        }
      });
    }
    return !isLoggedIn;
  }
}
