import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/model/movie-card';
import { MOCK_DATA } from 'src/app/shared/mock/mock-data';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  movies: MovieCard[];

  ngOnInit(): void {
    this.movies = MOCK_DATA;
  }
}
