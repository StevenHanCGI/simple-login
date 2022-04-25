import { User } from './../../models/user.model';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm: FormGroup;
  showFirstPassword: boolean = false;
  showSecondPassword: boolean = false;
  errMessageCred: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
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

  onSubmit() {
    if (this.registerForm.valid && this.getFirstPassword() === this.getRepeatPassword()) {
      this.authenticationService.register(this.getUser()).subscribe(response => {
        this.authenticationService.storeUserToken(response.token);
        this.authenticationService.gotoUsersDashboard();
      },
      (response) => {
        this.errMessageCred = response.error.error;
      })
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

  getFormsValue() {
    return this.registerForm.value;
  }

  getUser(): User {
    let user: User = {
      email: this.getEmail(),
      password: this.getFirstPassword()
    }
    return user;
  }

}
