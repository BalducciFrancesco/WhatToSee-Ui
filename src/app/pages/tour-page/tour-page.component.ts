import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { SuggestionDialogComponent } from 'src/app/components/suggestion-dialog/suggestion-dialog.component';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {

  public tour!: Tour

  
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private dialogService: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      mergeMap(tourId => this.tourService.get(tourId))
    ).subscribe(tour => this.tour = tour)
  }

  openSuggestionModal(): void {
    const dialogRef = this.dialogService.open(SuggestionDialogComponent, { data: this.tour });
    dialogRef.afterClosed().subscribe(newSuggestion => {
      this.tourService.createSuggestion(newSuggestion).subscribe()
    });
  }

  openReportModal(): void {
    const dialogRef = this.dialogService.open(ReportDialogComponent, { data: this.tour });
    dialogRef.afterClosed().subscribe(newReport => {
      this.tourService.createReport(newReport).subscribe()
    });
  }

}
