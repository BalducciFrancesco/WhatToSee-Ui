import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';
import { Report } from './../../dtos/tour';
import { TourPageComponent } from './../../pages/tour-page/tour-page.component';

/**
 * Dialog that shows all the reports on a tour.
 * @see TourPageComponent
 */
@Component({
  templateUrl: './problems-dialog.component.html',
  styleUrls: ['./problems-dialog.component.scss']
})
export class ProblemsDialogComponent implements OnInit {

  /**
   * Reports on the tour retrieved from backend.
   */
  reports$?: Observable<Report[]>

  constructor(
    private dialogRef: MatDialogRef<ProblemsDialogComponent>,
    private tourService: TourService,
    @Inject(MAT_DIALOG_DATA) private tour: Tour,  // tour checking
  ) { }

  ngOnInit(): void {
    this.reports$ = this.tourService.getReports(this.tour.id)
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(true)  // requesting tour deletion
  }

}
