import { ProblemsDialogComponent } from './../../components/problems-dialog/problems-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';
import { ReviewDialogComponent } from 'src/app/components/review-dialog/review-dialog.component';
import { UserRole } from 'src/app/dtos/user';

@Component({
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {

  tour?: Tour
  role!: UserRole
  UserRole = UserRole
  isOwner: boolean = false
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tourService: TourService,
    private dialogService: MatDialog,
    private notify: MatSnackBar,
    private userService: UserService,
  ) {}
  
  ngOnInit(): void {
    this.role = this.userService.getSession()!.role
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      mergeMap(tourId => this.tourService.getById(tourId))
    ).subscribe(tour => {
      this.tour = tour
      this.isOwner = tour.author.id === this.userService.getSession()!.id
    })
  }

  // -----------------
  // guide methods
  // -----------------
  
  delete(): void {
    this.tourService.delete(this.tour!.id).subscribe(() => {
      this.notify.open('Tour eliminato!');
      this.router.navigate(['/guide', 'you'])
    })
  }

  goEdit(): void {
    this.router.navigate(['edit'])
  }
  
  // -----------------
  // tourist methods
  // -----------------

  openReportModal(): void {
    const dialogRef = this.dialogService.open(ReportDialogComponent);
    dialogRef.afterClosed().subscribe(description => {
      if(description)
        this.tourService.createReport(this.tour!.id, { description }).subscribe(() => this.notify.open('Segnalazione inviata!'))
    });
  }

  openReviewModal(): void {
    const dialogRef = this.dialogService.open(ReviewDialogComponent);
    dialogRef.afterClosed().subscribe(review => {
      if(review) {
        this.tourService.createReview(this.tour!.id, review).subscribe((createdReview) => {
          this.tour!.reviews.push(createdReview);
          this.notify.open('Recensione inviata!')
        })
      }
    });
  }
  
  goChat(): void {
    this.router.navigate(['/messages', this.tour!.author.id])
  }

  markCompleted(): void {
    this.tourService.markAsCompleted(this.tour!.id).subscribe(() => this.notify.open('Segnato come completato!'));
  }

  // -----------------
  // administrator methods
  // -----------------

  openProblemsModal(): void {
    const dialogRef = this.dialogService.open(ProblemsDialogComponent, { data: this.tour });
    dialogRef.afterClosed().subscribe(isDelete => {
      if(isDelete)
        this.administratorDelete()
    });
  }

  private administratorDelete(): void {
    this.tourService.delete(this.tour!.id).subscribe(() => {
      this.notify.open('Tour eliminato!');
      this.router.navigate(['/administrator', 'you'])
    })
  }

}
