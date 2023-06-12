import { UserRole } from './../../dtos/user';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  hidePass = true;

  selectedRole: UserRole = UserRole.TOURIST
  UserRole = UserRole
  
  nonWhitespaceRegex = /[\S]/
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    firstName: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    lastName: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
  });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router
  ) { }

  submit() {
    if(!this.form.valid) return;

    let req;
    switch(this.selectedRole) {
      case UserRole.TOURIST: 
        req = this.userService.registerTourist(this.form.getRawValue())
        break
      case UserRole.GUIDE:
        req = this.userService.registerGuide(this.form.getRawValue())
        break
    }

    req?.subscribe(registered => {
      this.router.navigate(['/']);
    })
  }

}
