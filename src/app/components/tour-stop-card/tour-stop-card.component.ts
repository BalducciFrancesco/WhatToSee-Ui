import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TourStop, TourStopDTO } from 'src/app/dtos/tour';

@Component({
  selector: 'app-tour-stop-card',
  templateUrl: './tour-stop-card.component.html',
  styleUrls: ['./tour-stop-card.component.scss']
})
export class TourStopCardComponent {

  @Input() data!: TourStop | TourStopDTO

  constructor(private sanitizer: DomSanitizer) {}

  getImageSource(f: Blob): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f))
  }

}
