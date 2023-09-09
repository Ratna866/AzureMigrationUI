import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { loginService } from '../service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  RoleA: any = ['Admin', 'Client', 'User' , 'ProjectTeam'];
  repeatPass: string = 'none';
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  hide = true;
  constructor(
    private loginservice: loginService,
    private _router: Router
  ) {}
  ngOnInit(): void {}
  navigateToFirst() {
    this._router.navigate(['']);
  }
  SignUpForm = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    Role: new FormControl('', [Validators.required]),

    rpwd: new FormControl(''),
  });

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  get Name(): FormControl {
    return this.SignUpForm.get('name') as FormControl;
  }
  get EmailId(): FormControl {
    return this.SignUpForm.get('emailId') as FormControl;
  }
  get Password(): FormControl {
    return this.SignUpForm.get('password') as FormControl;
  }
  get RPWD(): FormControl {
    return this.SignUpForm.get('rpwd') as FormControl;
  }
  get Role(): FormControl {
    return this.SignUpForm.get('Role') as FormControl;
  }


  SignUpSubmited() {

    if (this.Password.value == this.RPWD.value) {
      console.log(this.SignUpForm.valid);
      this.repeatPass = 'none';
      console.log(this.SignUpForm.value);
      this.loginservice
        .SignUpUser(
        [
        this.SignUpForm.value.name,
        this.SignUpForm.value.emailId,
        this.SignUpForm.value.password,
        this.SignUpForm.value.Role
      ]
        )
        .subscribe((res) => {
          if (res == 'Success') {
            this.isAccountCreated = true;
            alert('Account created successfully');
            // this._router.navigate(['']);
          } else if (res == 'Already Exists') {
            alert('Account Already Exist. Try another user');
            this.isAccountCreated == false;
          } else {
            alert('Something went wrong');
            this.isAccountCreated = false;
          }
          console.log(res);
        });
    } else {
      this.repeatPass = 'inline';
    }
  }
}

