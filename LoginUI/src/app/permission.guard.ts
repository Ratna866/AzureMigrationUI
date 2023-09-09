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
export class PermissionGuard implements CanActivate{
  constructor(private router: Router, private location: Location) {}

  user: any;


canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  let user = { Role: localStorage.getItem('Role')?.replaceAll('"', '') };
  const isAuthorized = user.Role == route.data['Role'] ? true : false;
  if (!isAuthorized) {
    Swal.fire({
      icon: 'error',
      title: 'OOPS',
      text: 'You are not authorized',
    }).then((okay) => {
      if (okay) {
        this.location.back();
      }
    });
  }
  return isAuthorized;
}
}
