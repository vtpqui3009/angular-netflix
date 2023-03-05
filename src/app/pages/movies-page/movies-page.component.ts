import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  popularMovies: MovieCard[] = [];
  topRatedMovies: MovieCard[] = [];

  popularMoviesSubscription: Subscription;
  topRatedMoviesSubscription: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.popularMoviesSubscription = this.subscribePopularMovies();
    this.topRatedMoviesSubscription = this.subscribeTopRatedMovies();
  }
  subscribePopularMovies() {
    return this.movieService
      .getMovies(IVY_MOVIE_URL.POPULAR_MOVIES_URL, false, true)
      .subscribe((movies) => {
        this.popularMovies = movies;
      });
  }
  subscribeTopRatedMovies() {
    return this.movieService
      .getMovies(IVY_MOVIE_URL.TOP_RATED_MOVIES_URL, false, true)
      .subscribe((movies) => {
        this.topRatedMovies = movies;
      });
  }
  ngOnDestroy() {
    if (this.popularMoviesSubscription) {
      this.popularMoviesSubscription.unsubscribe();
    }
    if (this.topRatedMoviesSubscription) {
      this.topRatedMoviesSubscription.unsubscribe();
    }
  }
}
