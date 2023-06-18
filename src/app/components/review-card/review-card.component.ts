import { Component, Input } from '@angular/core';
import { Review } from 'src/app/dtos/tour';

/**
 * Card for displaying a review.
 */
@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input() data!: Review 

}
