import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './tour-stop-editor-dialog.component.html',
  styleUrls: ['./tour-stop-editor-dialog.component.scss']
})
export class TourStopEditorDialogComponent {
  
  form = this.fb.nonNullable.group({
    title: ['', Validators.required], 
    coordinates: this.fb.nonNullable.group({
      latitude: [-1, Validators.required], 
      longitude: [-1, Validators.required], 
    }),
    description: ['', Validators.required], 
    cost: [null, Validators.required], 
    duration: [null, Validators.required], 
    transportDTO: this.fb.nonNullable.group({
      transferCost: [null, Validators.required], 
      transferDuration: [null, Validators.required], 
      transferType: ['', Validators.required], 
      transferDetails: ['', Validators.required], 
      transferOtherOptions: ['', Validators.required], 
    }),
    images: [[], Validators.required], 
  });

  constructor(
    private dialogRef: MatDialogRef<TourStopEditorDialogComponent>,
    private fb: FormBuilder,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  onFilesSelected(e: Event | any) {
    (this.form.controls.images as FormControl<File[]>).setValue(Array.from(e.target.files))
  }
}
