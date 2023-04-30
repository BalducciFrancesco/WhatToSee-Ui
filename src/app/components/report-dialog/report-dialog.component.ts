import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tour } from 'src/app/dtos/tour';
import { StopEditorDialogComponent } from '../tour-stop-editor-dialog/tour-stop-editor-dialog.component';

@Component({
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {

  description: string | null = null;

  constructor(private dialogRef: MatDialogRef<ReportDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if(this.description !== null && this.description.trim())
      this.dialogRef.close(this.description);
  }

  keypress(key: KeyboardEvent) {
    if(key.code == 'Enter') {
      key.preventDefault()
      this.onSubmit()
    }
  }

}
