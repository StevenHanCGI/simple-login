import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, Subject, take, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

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

  submit(): void {
    if (this.registerForm.valid && this.getFirstPassword() === this.getRepeatPassword()) {

      this.authenticationService.register(this.getEmail(), this.getFirstPassword())
        .pipe(
          take(1),
          tap(response => {
            this.authenticationService.storeUserToken(response.token);
            this.authenticationService.gotoUsersDashboard();
          }),
          catchError(err => {
            this.errorMessageSubject.next(err);
            return EMPTY;
          })
        ).subscribe()
    } else {
      this.errorMessageSubject.next('Your password does not match');
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
