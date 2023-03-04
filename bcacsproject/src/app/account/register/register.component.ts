import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ILoginInfo } from 'src/app/Shared/Interface/ILoginInfo';
import { LoginService } from 'src/app/Shared/Services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public frmSignup !: FormGroup;
  loginInfo = new ILoginInfo();
  responseMsg: string = '';
  constructor(private fb: FormBuilder, private loginService: LoginService,private _rtr :Router) { }

  ngOnInit(): void {
    this.frmSignup = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      role:['']
    });
  }

  signup() {
    this.loginInfo.id = 0;
    this.loginInfo.email = this.frmSignup.value.email;
    this.loginInfo.password = this.frmSignup.value.password;
    this.loginInfo.role = this.frmSignup.value.role;

    console.warn(this.loginInfo);

    this.loginService.createuser(this.loginInfo).subscribe((result: any) => {
      console.warn(result);
      alert("New user created");
      this.frmSignup.reset();
      this._rtr.navigate(['account/login'])
    })

  }

}
