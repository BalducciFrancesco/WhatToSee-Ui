import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

/**
 * "For you" page for the logged user when he is an administrator.
 * It shows all the tours that have been reported.
 */
@Component({
  templateUrl: './administrator-page.component.html',
  styleUrls: ['./administrator-page.component.scss']
})
export class AdministratorPageComponent implements OnInit {

  reportedTours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.reportedTours$ = this.tourService.getReportedTours();
  }

  

}
