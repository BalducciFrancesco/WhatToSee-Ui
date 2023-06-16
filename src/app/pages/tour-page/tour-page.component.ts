import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';
import { ReviewDialogComponent } from 'src/app/components/review-dialog/review-dialog.component';
import { Conversation } from 'src/app/dtos/conversation';
import { Tour } from 'src/app/dtos/tour';
import { ConversationService } from 'src/app/services/conversation.service';
import { TourService } from 'src/app/services/tour.service';
import { ProblemsDialogComponent } from './../../components/problems-dialog/problems-dialog.component';
import { TourActions } from './../../dtos/tour';

@Component({
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {

  tour?: Tour
  actions?: TourActions

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tourService: TourService,
    private conversationService: ConversationService,
    private dialogService: MatDialog,
    private notify: MatSnackBar,
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      switchMap(tourId => forkJoin([this.tourService.getById(tourId), this.tourService.getAvailableActions(tourId)]))
    ).subscribe(([tour, actions]) => {
      this.tour = tour
      this.actions = actions
    })
  }

  // -----------------
  // guide methods
  // -----------------
  
  delete(): void {
    this.tourService.delete(this.tour!.id).subscribe(() => {
      this.notify.open('Tour eliminato con successo!', undefined, { panelClass: 'success-snackbar' });
      this.router.navigate(['/search'])
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
        this.tourService.createReport(this.tour!.id, { description }).subscribe(() => this.notify.open('Segnalazione inviata con successo!', undefined, { panelClass: 'success-snackbar' }))
    });
  }

  openReviewModal(): void {
    const dialogRef = this.dialogService.open(ReviewDialogComponent);
    dialogRef.afterClosed().subscribe(review => {
      if(review) {
        this.tourService.createReview(this.tour!.id, review).subscribe((createdReview) => {
          this.tour!.reviews.push(createdReview);
          this.notify.open('Recensione inviata con successo!', undefined, { panelClass: 'success-snackbar' })
        })
      }
    });
  }
  
  goConversation(): void {
    this.conversationService.getByGuide(this.tour!.author.id).subscribe((c: Conversation | null) => {
      if(c) { // conversation already exists
        // navigate to that, passing the already loaded data
        this.router.navigate(['/conversation', c.id], { state: c})
      } else {
        // navigate to a pre-conversation page, passing the requested guide
        this.router.navigate(['/conversation', 'new'], { state: { 'guideId': this.tour!.author.id }})
      }
    })
  }

  markCompleted(): void {
    this.tourService.markAsCompleted(this.tour!.id).subscribe(() => this.notify.open('Segnato come completato con successo!', undefined, { panelClass: 'success-snackbar' }));
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
      this.notify.open('Tour eliminato con successo!', undefined, { panelClass: 'success-snackbar' });
      this.router.navigate(['/administrator', 'you'])
    })
  }

}
