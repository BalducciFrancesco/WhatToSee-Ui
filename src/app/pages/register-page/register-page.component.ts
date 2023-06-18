import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserRole } from './../../dtos/user';

/**
 * Register page.
 */
@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  /**
   * Whether the password is shown as dots or as plain text.
   */
  hidePass = true;

  /**
   * Role selected by the user.
   */
  selectedRole: UserRole = UserRole.TOURIST

  /**
   * Enum for user roles, needed in the template.
   */
  UserRole = UserRole
  
  /**
   * Regex for checking that a string contains at least one non-whitespace character.
   */
  nonWhitespaceRegex = /[\S]/

  /**
   * User input for registration.
   */
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    firstName: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
    lastName: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegex)]],
  });

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private notify: MatSnackBar,
    private router: Router
  ) { }

  /**
   * User pressed the register button or enter.
   */
  submit(): void {
    if(!this.form.valid) return;
    this.userService.register(this.form.getRawValue(), this.selectedRole).subscribe(registered => {
      // user registered: show success message and redirect to home
      this.notify.open('Ben arrivato, ' + registered.firstName + '!', undefined, { panelClass: 'success-snackbar' })
      this.router.navigate(['/']);
    })
  }

}
