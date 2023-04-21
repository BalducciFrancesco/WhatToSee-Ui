import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  hidePass = [true, true];

  touristRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  guideRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router
  ) { }

  submitTourist() {
    if (this.touristRegister.valid) {
      this.userService.registerTourist(this.touristRegister.getRawValue()).subscribe(registeredTourist => {
        this.router.navigate(['/']);
      })
    }
  }

  submitGuide() {
    if (this.guideRegister.valid) {
      this.userService.registerGuide(this.guideRegister.getRawValue()).subscribe(registeredGuide => {
        this.router.navigate(['/']);
      })
    }
  }

}
