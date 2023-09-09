import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators} from '@angular/forms';

import { FloatLabelType } from '@angular/material/form-field';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { loginService } from '../service/login.service';

import { ResetPasswordService } from '../service/reset-password.service';

import { NgToastService } from 'ng-angular-popup';

 

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit{

 // model: any = {};

  responsedata: any;

  Isloggedin = false;

  isUserValid = false;

  RoleA : any = ['Admin', 'Client', 'User' , 'ProjectTeam'];

 

  //isUserValid: boolean | undefined;

  hide = true;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

 

  public resetPasswordEmail!:string;

  public isValidEmail!:boolean;

 

  constructor(

    private loginservice: loginService,

    private _router: Router,

    private toast:NgToastService,

    private resetService:ResetPasswordService,

    // private emailservice: ResetPasswordService

  ) { }

 

  ngOnInit(): void { }

 

  loginForm:FormGroup = new FormGroup({

      emailId: new FormControl('', [Validators.required,Validators.email]),

       password: new FormControl('', [

         Validators.required,

        // Validators.minLength(6),

         //Validators.maxLength(15),

 

 

        ]),

        Role: new FormControl('', [Validators.required]),

 

  });

 

 

 

  // loginUser() {

  //   this.loginservice.login(this.loginForm.value).subscribe(res => {

 

  //     if (res == 'Failure'){

 

  //       this.isUserValid = false;

 

  //       alert('Login Unsuccessful');

 

  //     } else {

 

  //       this.isUserValid = true;

  //     }

  //   });

  // }

  // loginUser(){

  //   this.loginservice.loginUser([this.loginForm.value.emailId, this.loginForm.value.password])

 

  //   .subscribe(res => {

 

  //    if (res == 'Failure'){

 

  //      this.isUserValid = false;

 

  //      alert('Login UnSuccessful');

 

  //    }

  //    else if(res == 'Success')

  //    {

  //      this.isUserValid = true;

 

  //      this.loginservice.setToken(res);

  //     alert('Login successful');

 

  //     // this._router.navigateByUrl('/home')

 

  //    }

 

  //   });

 

  //}

  // loginUser() {

  //   this.loginservice.login(this.loginForm.value).subscribe({

  //     next: (response) => {

  //       console.log(response);

  //       if (response != null) {

  //         this.responsedata = response;

  //         localStorage.setItem('token', this.responsedata.result);

  //         localStorage.setItem(

  //           'email',

  //           JSON.stringify(this.loginForm.value.emailId)

  //         );

  //       }

  //       this.Isloggedin = true;

  //       // alert('Login successful');

  //       this._router.navigate(['/home'])

  //     }

  //   });

  // }

 

  loginUser() {

    this.loginservice.login(this.loginForm.value).subscribe({

      next: (response) => {

        console.log(response);

        if (response != null) {

          this.responsedata = response;

          localStorage.setItem('token', this.responsedata.result);

          localStorage.setItem(

            'emailId',

            this.loginForm.value.emailId

          );

          localStorage.setItem(

            'Role',

            this.loginForm.value.Role

          );

          if (this.loginForm.value.Role === 'User') {

            // this._router.navigate(["app-employees"])window.location.reload();

            this._router.navigate(['home'])

           // this._router.navigate(['home']);

          } else if (this.loginForm.value.Role === 'Client') {

            this._router.navigate(['client']);

          } else if (this.loginForm.value.Role === 'Admin') {

            this._router.navigate(['admin']);

          }

          else if (this.loginForm.value.Role === 'ProjectTeam'){

            this._router.navigate(['projectTeam']);

          }

        }

        this.Isloggedin = true;

      },

      error: err => {

 

        if (err.status == 400) {

          Swal.fire({

            icon: 'error',

            title: 'Invalid Details',

            text: 'Username or Password or Role is incorrect!'

          }).then((okay) => {

            if (okay) {

              this._router.navigate(['']);

              this.loginForm.reset();

            }

          })

        }

      }

    });

  }

 

  get EmailId(): FormControl {

    return this.loginForm.get('emailId') as FormControl;

  }

  get Password(): FormControl {

    return this.loginForm.get('password') as FormControl;

  }

 

  get Role(): FormControl {

    return this.loginForm.get('Role') as FormControl;

  }

 

  checkValidEmail(event:string)

  {

    const value =event;

    const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;

    this.isValidEmail = pattern.test(value);

    return this.isValidEmail;

  }

  confirmToSend(){

    if(this.checkValidEmail(this.resetPasswordEmail)){

      console.log(this.resetPasswordEmail);

     

      //API call to be done

      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)

      .subscribe({

        next:(res)=>{

          this.toast.success({

            detail:'Success',

            summary:'Reset Success!',

            duration:3000,

          });

          this.resetPasswordEmail="";

          const buttonRef =document.getElementById("closeBtn");

          buttonRef?.click();

        },

        error:(err)=>{

          this.toast.error({

            detail:'ERROR',

            summary:'Something went wrong!',

            duration:3000,

          });

        }

      })

    }

  }

}

         

       

   

 

 