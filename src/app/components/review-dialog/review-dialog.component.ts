import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StopEditorDialogComponent } from '../tour-stop-editor-dialog/tour-stop-editor-dialog.component';

@Component({
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {

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
    this.dialogRef.close(this.form.getRawValue());
  }
  
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
