import { Report } from './../../dtos/tour';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stop, Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';
import { StopEditorDialogComponent } from '../tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './problems-dialog.component.html',
  styleUrls: ['./problems-dialog.component.scss']
})
export class ProblemsDialogComponent implements OnInit {

  reports$?: Observable<Report[]>

  constructor(
    private dialogRef: MatDialogRef<ProblemsDialogComponent>,
    private tourService: TourService,
    @Inject(MAT_DIALOG_DATA) private tour: Tour,
  ) { }

  ngOnInit(): void {
    this.reports$ = this.tourService.getReports(this.tour.id)
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(true)
  }

}
