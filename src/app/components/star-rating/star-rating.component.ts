import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() stars: number = 0

  public getIcon(i: number): string {
    if (i < this.stars)
      return 'star'
    return 'star_border'
  }

}
