import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Stop, StopDTO } from 'src/app/dtos/tour';

@Component({
  selector: 'app-tour-stop-card',
  templateUrl: './tour-stop-card.component.html',
  styleUrls: ['./tour-stop-card.component.scss']
})
export class StopCardComponent {

  @Input() data!: Stop | StopDTO

  @Input() editable: boolean = false
  @Input() deletable: boolean = false

  @Output() editClick: EventEmitter<void> = new EventEmitter<void>()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>()

}
