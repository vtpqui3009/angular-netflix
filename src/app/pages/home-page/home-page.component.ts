import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MOCK_DATA } from 'src/app/shared/mock/mock-data';
import { MovieService } from 'src/app/core/services/movie.service';
import { Genre } from 'src/app/shared/models/genre';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  movies: MovieCard[] = [];
  genres: Genre[] = [];

  genresSubscription: Subscription;
  popularMoviesSubscription: Subscription;

  ngOnInit(): void {
    this.movies = MOCK_DATA;
    this.genresSubscription = this.movieService
      .getAllGenresOfMovie()
      .subscribe((genres) => {
        this.genres = genres;
      });

    this.popularMoviesSubscription = this.movieService
      .getPopularMovies()
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnDestroy() {
    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
    if (this.popularMoviesSubscription) {
      this.popularMoviesSubscription.unsubscribe();
    }
  }
}
