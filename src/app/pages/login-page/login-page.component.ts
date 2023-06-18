import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

/**
 * Login page.
 */
@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  /**
   * Whether the password is shown as dots or as plain text.
   */
  hidePass = true;

  /**
   * Regex for checking that a string contains at least one non-whitespace character.
   */
  nonWhitespaceRegex = /[\S]/

  /**
   * User input for login.
   */
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
  
  /**
   * User pressed the login button or enter.
   */
  submit(): void {
    if (!this.form.valid) return;
    this.userService.login(this.form.getRawValue()).subscribe(logged => {
      // user logged: show success message and redirect to home
      this.notify.open('Ben tornato, ' + logged.firstName + '!', undefined, { panelClass: 'success-snackbar' })
      this.router.navigate(['/']);
    })
  }
}
