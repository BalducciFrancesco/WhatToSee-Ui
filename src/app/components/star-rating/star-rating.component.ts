import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() stars: number = 0
  @Output() starsChange: EventEmitter<number> = new EventEmitter()

  @Input() editable: boolean = false

  public getIcon(i: number): string {
    if (i < this.stars)
      return 'star'
    return 'star_border'
  }

  public onClick(i: number): void {
    if (this.editable) {
      this.stars = i + 1
      this.starsChange.emit(this.stars + 1)
    }
  }

}
