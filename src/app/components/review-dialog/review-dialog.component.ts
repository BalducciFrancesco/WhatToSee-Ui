import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Dialog for reviewing a tour.
 * @see TourPageComponent
 */
@Component({
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {

  /**
   * User input for the review.
   */
  form = this.fb.nonNullable.group({
    stars: [0, [Validators.required, Validators.min(1)]],
    description: [null, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    private fb: FormBuilder,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    if(this.form.valid)
      this.dialogRef.close(this.form.getRawValue());  // return user input for review
  }
  
  /**
   * When user presses enter, submit the form.
   * @param key the key pressed
   */
  keypress(key: KeyboardEvent) {
    if(key.code == 'Enter') {
      key.preventDefault()
      this.onSubmit()
    }
  }

  onStarChange(stars: number) {
    this.form.patchValue({ stars })
  }

}
