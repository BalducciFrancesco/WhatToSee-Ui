import { Component, Input } from '@angular/core';
import { Tour } from 'src/app/dtos/tour';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent {

  @Input() data!: Tour 

}
