import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component for displaying a star rating.
 */
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() stars: number = 0
  @Output() starsChange: EventEmitter<number> = new EventEmitter()

  /**
   * Whether the star rating is editable.
   * Should be set to true only in the review dialog.
   */
  @Input() editable: boolean = false

  /**
   * Method called for each star that is being rendered
   * @param i the index of the star being rendered
   * @returns the icon code to be displayed
   */
  public getIcon(i: number): string {
    return i < this.stars ? 'star' : 'star_border'
  }

  /**
   * WHen user clicks on a star, update the rating.
   * @param i the index of the star clicked
   */
  public onClick(i: number): void {
    if (this.editable) {
      this.stars = i + 1
      this.starsChange.emit(this.stars)
    }
  }

}
