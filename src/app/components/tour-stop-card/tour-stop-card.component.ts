import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Stop, StopDTO } from 'src/app/dtos/tour';

@Component({
  selector: 'app-tour-stop-card',
  templateUrl: './tour-stop-card.component.html',
  styleUrls: ['./tour-stop-card.component.scss']
})
export class StopCardComponent {

  @Input() data!: Stop | StopDTO

  constructor(private sanitizer: DomSanitizer) {}

  getImageSource(f: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))
  }

}
