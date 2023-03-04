import { Component, OnInit } from '@angular/core';

import { MOVIES_DATA } from 'src/app/shared/mock/mock-data';
import { MovieCard } from 'src/app/shared/models/movie-card';
@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  movies: MovieCard[] = [];
  constructor() {}

  ngOnInit(): void {
    this.movies = MOVIES_DATA;
  }
}
