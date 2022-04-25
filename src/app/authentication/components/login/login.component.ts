import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  showEyeIcon: boolean = false;
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
      this.authenticationService.login(this.getUser()).subscribe(token => {
        this.authenticationService.storeUserToken(token.token);
        this.authenticationService.gotoUsersDashboard();
      })
    }
  }

  getEmail() {
    return this.loginForm.value.email;
  }

  getPassword() {
    return this.loginForm.value.password;
  }

  getUser(): User {
    let user: User = {
      email: this.getEmail(),
      password: this.getPassword()
    };
    return user;
  }

}
