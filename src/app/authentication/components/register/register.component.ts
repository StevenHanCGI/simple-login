import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  errMessageCred: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}') // simple regex that allows uppercase, lowercase, number, min length 8
      ])),
      repeatPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}')
      ]))
    });
  }

  submit() {
    if (this.registerForm.valid && this.getFirstPassword() === this.getRepeatPassword()) {

      this.authenticationService.register(this.getEmail(), this.getFirstPassword())
        .pipe(
          take(1),
          tap(response => {
            this.authenticationService.storeUserToken(response.token);
            this.authenticationService.gotoUsersDashboard();
          }),
          catchError(err => this.errMessageCred = err),
        ).subscribe()
    } else {
      this.errMessageCred = 'Your password does not match';
    }
  }

  getEmail() {
    return this.registerForm.value.email;
  }

  getFirstPassword() {
    return this.registerForm.value.password;
  }

  getRepeatPassword() {
    return this.registerForm.value.repeatPassword;
  }

}
