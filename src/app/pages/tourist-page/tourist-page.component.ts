import { TourService } from 'src/app/services/tour.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';

@Component({
  templateUrl: './tourist-page.component.html',
  styleUrls: ['./tourist-page.component.scss']
})
export class TouristPageComponent implements OnInit {

  sharedTours$!: Observable<Tour[]>;
  completedTours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.sharedTours$ = this.tourService.getSharedTours();
    this.completedTours$ = this.tourService.getCompletedTours();
  }

  

}
