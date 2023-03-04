import { Component } from '@angular/core';

import { MOVIES_DATA } from 'src/app/shared/mock/mock-data';
import { MovieCard } from 'src/app/shared/models/movie-card';
@Component({
  selector: 'app-person-detail-page',
  templateUrl: './person-detail-page.component.html',
  styleUrls: ['./person-detail-page.component.scss'],
})
export class PersonDetailPageComponent {
  movies: MovieCard[] = [];
  constructor() {}

  ngOnInit(): void {
    this.movies = MOVIES_DATA;
  }
}
