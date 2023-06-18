import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

/**
 * "For you" page for the logged user when he is a guide.
 */
@Component({
  templateUrl: './tourist-page.component.html',
  styleUrls: ['./tourist-page.component.scss']
})
export class TouristPageComponent implements OnInit {

  /**
   * The tours shared with the logged user. Received from backend.
   */
  sharedTours$!: Observable<Tour[]>;

  /**
   * The tours completed by the logged user. Received from backend.
   */
  completedTours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.sharedTours$ = this.tourService.getSharedTours();
    this.completedTours$ = this.tourService.getCompletedTours();
  }

  

}
