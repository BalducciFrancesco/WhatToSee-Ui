import { Utils } from 'src/app/classes/utils';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './tour-stop-editor-dialog.component.html',
  styleUrls: ['./tour-stop-editor-dialog.component.scss']
})
export class TourStopEditorDialogComponent {
  
  form = this.fb.nonNullable.group({
    title: new FormControl<string | null>(null, { validators: Validators.required}),
    description: new FormControl<string | null>(null, { validators: Validators.required}),
    cost: new FormControl<number | null>(null, { validators: Validators.required}),
    duration: new FormControl<string | null>(null, { validators: Validators.required}),
    transferCost: new FormControl<number | null>(null, { validators: Validators.required}),
    transferDuration: new FormControl<string | null>(null, { validators: Validators.required}),
    transferType: new FormControl<string | null>(null, { validators: Validators.required}),
    transferDetails: new FormControl<string | null>(null, { validators: Validators.required}),
    transferOtherOptions: new FormControl<string | null>(null),
  });

  constructor(
    private dialogRef: MatDialogRef<TourStopEditorDialogComponent>,
    private fb: FormBuilder,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(Utils.nonEmptyFieldsOf(this.form.value));
  }

}
