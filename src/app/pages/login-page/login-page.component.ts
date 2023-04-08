import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hidePass = [true, true, true];

  touristLogin = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  guideLogin = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  adminLogin = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) { }
  
  submitTourist() {
    if(this.touristLogin.valid) {
      this.userService.loginTourist(this.touristLogin.getRawValue()).subscribe(loggedTourist => {
        this.router.navigate(['/']);
      })
    }
  }

  submitGuide() {
    if(this.guideLogin.valid) {
      this.userService.loginGuide(this.guideLogin.getRawValue()).subscribe(loggedGuide => {
        this.router.navigate(['/']);
      })
    }
  }

  submitAdministrator() {
    if(this.adminLogin.valid) {
      this.userService.loginAdministrator(this.adminLogin.getRawValue()).subscribe(loggedAdmin => {
        this.router.navigate(['/']);
      })
    }
  }
}
