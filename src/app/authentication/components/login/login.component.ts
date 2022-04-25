import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errMessageCred: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
   }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.getEmail(), this.getPassword()).subscribe(token => {
        this.authenticationService.storeUserToken(token.token);
        this.authenticationService.gotoUsersDashboard();
      },
      (errorResponse) => {
        this.errMessageCred = errorResponse.error.error;
      })
    }
  }

  getEmail() {
    return this.loginForm.value.email;
  }

  getPassword() {
    return this.loginForm.value.password;
  }

}
