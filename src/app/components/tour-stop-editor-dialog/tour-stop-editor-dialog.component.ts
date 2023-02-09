import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './tour-stop-editor-dialog.component.html',
  styleUrls: ['./tour-stop-editor-dialog.component.scss']
})
export class TourStopEditorDialogComponent implements OnInit {
  
  form = this.fb.nonNullable.group({
    title: ['', Validators.required], 
    latitude: [-1, Validators.required], 
    longitude: [-1, Validators.required], 
    index: [-1, Validators.required],         // hidden, calcultaed
    description: ['', Validators.required], 
    cost: [null, Validators.required], 
    duration: [null, Validators.required], 
    transferCost: [null, Validators.required], 
    transferDuration: [null, Validators.required], 
    transferType: ['', Validators.required], 
    transferDetails: ['', Validators.required], 
    otherOptions: ['', Validators.required], 
    images: [null, Validators.required], 
  });

  constructor(
    private dialogRef: MatDialogRef<TourStopEditorDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private index: number,
  ) { }

  ngOnInit(): void {
    this.form.patchValue({ index: this.index })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  onFilesSelected(e: Event | any) {
    this.form.controls.images.setValue(e.target.files)
  }
}
