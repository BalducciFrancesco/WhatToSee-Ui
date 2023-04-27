import { TourService } from 'src/app/services/tour.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';

@Component({
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent implements OnInit {

  createdTours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.createdTours$ = this.tourService.getCreatedTours();
  }

  

}
