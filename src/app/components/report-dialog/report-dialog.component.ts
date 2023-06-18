import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TourPageComponent } from './../../pages/tour-page/tour-page.component';

/**
 * Dialog for reporting a tour.
 * @see TourPageComponent
 */
@Component({
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {

  /**
   * User input for the report description.
   */
  description: string | null = null;

  constructor(private dialogRef: MatDialogRef<ReportDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if(this.description !== null && this.description.trim())
      this.dialogRef.close(this.description); // return user input for report description
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

}
