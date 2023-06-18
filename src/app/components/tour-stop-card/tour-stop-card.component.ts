import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stop, StopDTO } from 'src/app/dtos/tour';

/**
 * Card for displaying a tour stop.
 */
@Component({
  selector: 'app-tour-stop-card',
  templateUrl: './tour-stop-card.component.html',
  styleUrls: ['./tour-stop-card.component.scss']
})
export class StopCardComponent {

  @Input() data!: Stop | StopDTO

  /**
   * Whether the stop is editable (will not actually perform the action, just emit the user interacton)
   * Should be set to true only in the tour edit page.
   */
  @Input() editable: boolean = false

  /**
   * Whether the stop is deletable (will not actually perform the action, just emit the user interacton)
   * Should be set to true only in the tour edit page.
   */
  @Input() deletable: boolean = false

  @Output() editClick: EventEmitter<void> = new EventEmitter<void>()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>()

}
