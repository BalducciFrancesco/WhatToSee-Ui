import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/dtos/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hidePass = true;

  selectedRole: UserRole = UserRole.TOURIST

  nonWhitespaceRegex = /[\S]/
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
  });

  UserRole = UserRole

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) { }
  
  submit() {
    if (!this.form.valid) return;

    let req;
    switch (this.selectedRole) {
      case UserRole.TOURIST:
        req = this.userService.loginTourist(this.form.getRawValue())
        break
      case UserRole.GUIDE:
        req = this.userService.loginGuide(this.form.getRawValue())
        break
      case UserRole.ADMINISTRATOR:
        req = this.userService.loginAdministrator(this.form.getRawValue())
        break
    }

    req?.subscribe(logged => {
      this.router.navigate(['/']);
    })
  }
}
