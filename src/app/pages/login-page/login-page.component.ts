import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hidePass = true;

  nonWhitespaceRegex = /[\S]/
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
  });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private notify: MatSnackBar,
    private router: Router
  ) { }
  
  submit() {
    if (!this.form.valid) return;
    this.userService.login(this.form.getRawValue()).subscribe(logged => {
      this.notify.open('Ben tornato, ' + logged.firstName + '!', undefined, { panelClass: 'success-snackbar' })
      this.router.navigate(['/']);
    })
  }
}
