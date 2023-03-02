import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  constructor(private router: Router){}
  @Input() imageUrl: string;
  @Input() year: number;
  @Input() name: string;
  href: string;
  ngOnInit(): void {
    this.href = this.router.url;
  }
}
