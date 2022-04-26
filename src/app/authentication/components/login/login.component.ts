import { catchError, take, tap } from 'rxjs';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMessageCred: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
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

  submit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.getEmail(), this.getPassword())
        .pipe(
          take(1),
          tap(response => {
            this.authenticationService.storeUserToken(response.token);
            this.authenticationService.gotoUsersDashboard();
          }),
          catchError(err => this.errMessageCred = err),
        ).subscribe()
    }
  }

  getEmail() {
    return this.loginForm.value.email;
  }

  getPassword() {
    return this.loginForm.value.password;
  }

}
