import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tour } from 'src/app/dtos/tour';
import { TourStopEditorDialogComponent } from '../tour-stop-editor-dialog/tour-stop-editor-dialog.component';

@Component({
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  form = this.fb.nonNullable.group({
    tourId: [-1, Validators.required],
    reason: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<TourStopEditorDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private tour: Tour,
  ) { }

  ngOnInit(): void {
    this.form.patchValue({ tourId: this.tour.id })
  }

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

}
