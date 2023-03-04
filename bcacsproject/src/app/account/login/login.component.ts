import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginInfo } from 'src/app/Shared/Interface/ILoginInfo';
import { LoginService } from 'src/app/Shared/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public frmlogin !: FormGroup;
  responseMsg: string = '';
  flag: boolean = false;
  inputdata = new ILoginInfo();
  ErrorMessage !: string;

 

  constructor(private fb: FormBuilder, private loginService: LoginService, private _rtr: Router) { }

  ngOnInit(): void {
    this.frmlogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  login() {
    this.inputdata.email = this.frmlogin.value.email;
    this.inputdata.password = this.frmlogin.value.password;  



    this.loginService.getUsers().subscribe(result => {
      const user = result.filter((el: any) => {
        return el.email === this.inputdata.email && el.password === this.inputdata.password
      });
      if (user) {
        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('username', user.email)
        localStorage.setItem('role', user.role)
        if (jwtToken) {
          const role = localStorage.getItem('role')
          if (role == "student") {
            this.frmlogin.reset();
            this._rtr.navigate(['dashboard']);
          } else {
            this.frmlogin.reset();
            this._rtr.navigate(['dashboard']);
          }
        }

      } else {

        this.flag = true;
        this.responseMsg = "Incorrect username or password";
      }
    }, () => {
      //this.flag=true;
      //this.ErrorMessage = "Something went wrong..!";
    })
  }


}
