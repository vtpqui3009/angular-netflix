import { Component, OnInit } from '@angular/core';
import { MOVIES_DATA } from 'src/app/shared/mock/mock-data';
import { MovieCard } from 'src/app/shared/model/movie-card';
@Component({
  selector: 'app-tv-series-page',
  templateUrl: './tv-series-page.component.html',
  styleUrls: ['./tv-series-page.component.scss'],
})
export class TvSeriesPageComponent implements OnInit {
  movies: MovieCard[] = [];
  constructor() {}

  ngOnInit(): void {
    this.movies = MOVIES_DATA;
  }
}
