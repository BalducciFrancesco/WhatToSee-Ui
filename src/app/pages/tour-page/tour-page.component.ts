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

/**
 * Page that shows the details of a tour.
 */
@Component({
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {

  /**
   * The tour loaded from backend
   */
  tour?: Tour

  /**
   * The set of actions available for the current user
   */
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
      map((param: ParamMap) => param.get('id')!), // get the id from the route
      map(tourId => Number.parseInt(tourId)),
      switchMap(tourId => forkJoin([this.tourService.getById(tourId), this.tourService.getAvailableActions(tourId)]))
    ).subscribe(([tour, actions]) => {
      // save and display the loaded tour and actions
      this.tour = tour
      this.actions = actions
    })
  }

  /**
   * After any FAB action, refresh the available actions
   */
  afterAction(): void {
    this.tourService.getAvailableActions(this.tour!.id).subscribe(actions => this.actions = actions)
  }

  // -----------------
  // guide methods
  // -----------------
  
  /**
   * Guide (or administrator without reviewing reports) requested to delete the tour
   */
  delete(): void {
    this.tourService.delete(this.tour!.id).subscribe(() => {
      // tour deleted, return to search page
      this.notify.open('Tour eliminato con successo!', undefined, { panelClass: 'success-snackbar' });
      this.router.navigate(['/search'])
    })
  }

  /**
   * Guide requested to edit the tour
   */
  goEdit(): void {
    this.router.navigate(['edit'])
  }
  
  // -----------------
  // tourist methods
  // -----------------

  /**
   * Tourist requested to report the tour
   */
  openReportModal(): void {
    const dialogRef = this.dialogService.open(ReportDialogComponent);
    dialogRef.afterClosed().subscribe(description => {
      if(description) { // if the user inserted a description
        this.tourService.createReport(this.tour!.id, { description }).subscribe(() => { 
          // report created, notify the user and refresh the available actions
          this.notify.open('Segnalazione inviata con successo!', undefined, { panelClass: 'success-snackbar' })
          this.afterAction()
        })
      }
    });
  }

  /**
   * Tourist requested to review the tour
   */
  openReviewModal(): void {
    const dialogRef = this.dialogService.open(ReviewDialogComponent);
    dialogRef.afterClosed().subscribe(review => {
      if(review) {  // if the user inserted a review
        this.tourService.createReview(this.tour!.id, review).subscribe((createdReview) => {
          // review created, add to the existing ones, notify the user and refresh the available actions
          this.tour!.reviews.push(createdReview);
          this.notify.open('Recensione inviata con successo!', undefined, { panelClass: 'success-snackbar' })
          this.afterAction()
        })
      }
    });
  }
  
  /**
   * Tourist requested to have a conversation with the guide
   */
  goConversation(): void {
    this.conversationService.getByGuide(this.tour!.author.id).subscribe((c: Conversation | null) => {
      // check if a conversation already exists with the guide
      if(c) { // already exists
        // navigate to that, passing the already loaded data as route extras
        this.router.navigate(['/conversation', c.id], { state: c})
      } else {  // doesn't exist
        // navigate to a pre-conversation page, passing the requested guide as routes extras
        this.router.navigate(['/conversation', 'new'], { state: { 'guideId': this.tour!.author.id }})
      }
    })
  }

  /**
   * Tourist requested to mark the tour as completed
   */
  markCompleted(): void {
    this.tourService.markAsCompleted(this.tour!.id).subscribe(() => {
      // tour marked as completed, notify the user and refresh the available actions
      this.notify.open('Segnato come completato con successo!', undefined, { panelClass: 'success-snackbar' });
      this.afterAction()
    })
  }

  // -----------------
  // administrator methods
  // -----------------

  /**
   * Administrator requested to see the created reports
   */
  openProblemsModal(): void {
    const dialogRef = this.dialogService.open(ProblemsDialogComponent, { data: this.tour });
    dialogRef.afterClosed().subscribe(isDelete => {
      if(isDelete)  // after reviewing the reports, the administrator requested to delete the tour
        this.administratorDelete()
    });
  }

  /**
   * Administrator requested to delete the tour after reviewing the reports 
   */
  private administratorDelete(): void {
    this.tourService.delete(this.tour!.id).subscribe(() => {
      this.notify.open('Tour eliminato con successo!', undefined, { panelClass: 'success-snackbar' });
      this.router.navigate(['/administrator', 'you'])
    })
  }

}
