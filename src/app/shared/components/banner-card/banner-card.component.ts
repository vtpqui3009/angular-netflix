import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent {
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() category: any;
  @Input() description: string;
}
