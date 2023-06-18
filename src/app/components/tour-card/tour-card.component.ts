import { Component, Input } from '@angular/core';
import { Tour } from 'src/app/dtos/tour';
import { SearchPageComponent } from './../../pages/search-page/search-page.component';

/**
 * Card for syntehtically displaying a tour.
 * @see SearchPageComponent
 */
@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent {

  @Input() data!: Tour 

}
