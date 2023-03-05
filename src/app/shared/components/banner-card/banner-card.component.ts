import { Component, Input } from '@angular/core';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent {
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() genres: Genre[];
  @Input() overview: string;
}
