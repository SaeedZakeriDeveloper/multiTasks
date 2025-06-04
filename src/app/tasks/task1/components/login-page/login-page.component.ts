import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  title = 'testMay12';
  emailRequiredError: boolean = false
  emailAddreseError: boolean = false
  passwordRequiredError: boolean = false
  passwordMinLengthError: boolean = false
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)])
  })


  onSubmit() {
    this.emailRequiredError = false
    this.emailAddreseError = false
    this.passwordRequiredError = false
    this.passwordMinLengthError = false

    if (this.loginForm.valid) {
      alert("form submitted")
    }
    else {
      if (this.loginForm.controls.email.errors) {

        if ((this.loginForm.controls.email.errors as any).required) {
          this.emailRequiredError = true
        }
        else {
          this.emailAddreseError = true
        }
      } if (this.loginForm.controls.password.errors) {

        if ((this.loginForm.controls.password.errors as any).required) {
          this.passwordRequiredError = true
        }
        else {
          this.passwordMinLengthError = true
        }

      }

    }

  }

}
