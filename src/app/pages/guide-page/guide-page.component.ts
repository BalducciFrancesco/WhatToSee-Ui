import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

/**
 * "For you" page for the logged user when he is a guide.
 */
@Component({
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent implements OnInit {

  /**
   * Tours created by the logged user.
   */
  createdTours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.createdTours$ = this.tourService.getCreatedTours();
  }

  

}
