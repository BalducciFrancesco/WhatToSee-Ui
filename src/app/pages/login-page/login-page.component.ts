import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hidePass = [true, true, true];

  turistLogin = this.fb.nonNullable.group({
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

  constructor(private fb: FormBuilder, private userService: UserService) { }
  
  submitTurist() {
    if(this.turistLogin.valid) {
      this.userService.loginTourist(this.turistLogin.getRawValue()).subscribe(success => {
        console.log(success);
      })
    }
  }

  submitGuide() {
    if (this.guideLogin.valid) {
      this.userService.loginGuide(this.guideLogin.getRawValue()).subscribe(success => {
        console.log(success);
      })
    }
  }

  submitAdministrator() {
    if (this.adminLogin.valid) {
      this.userService.loginAdministrator(this.adminLogin.getRawValue()).subscribe(success => {
        console.log(success);
      })
    }
  }
}
