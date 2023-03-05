import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  popularMovies: MovieCard[] = [];
  topRatedMovies: MovieCard[] = [];
  popularTvSeries: MovieCard[] = [];
  topRatedTvSeries: MovieCard[] = [];

  popularMoviesSubscription: Subscription;
  topRatedMoviesSubscription: Subscription;
  popularTvSeriesSubscription: Subscription;
  topRatedTvSeriesSubscription: Subscription;

  ngOnInit(): void {
    this.popularMoviesSubscription = this.subscribePopularMovies();
    this.topRatedMoviesSubscription = this.subscribeTopRatedMovies();
    this.popularTvSeriesSubscription = this.subscribePopularTvSeries();
    this.topRatedTvSeriesSubscription = this.subscribeTopRatedTvSeries();
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
  subscribePopularTvSeries() {
    return this.movieService
      .getMovies(IVY_MOVIE_URL.POPULAR_TV_SERIES_URL, false, true)
      .subscribe((movies) => {
        this.popularTvSeries = movies;
      });
  }
  subscribeTopRatedTvSeries() {
    return this.movieService
      .getMovies(IVY_MOVIE_URL.TOP_RATED_TV_SERIES_URL, false, true)
      .subscribe((movies) => {
        this.topRatedTvSeries = movies;
      });
  }
  ngOnDestroy() {
    if (this.popularMoviesSubscription) {
      this.popularMoviesSubscription.unsubscribe();
    }
    if (this.topRatedMoviesSubscription) {
      this.topRatedMoviesSubscription.unsubscribe();
    }
    if (this.popularTvSeriesSubscription) {
      this.popularTvSeriesSubscription.unsubscribe();
    }
    if (this.topRatedTvSeriesSubscription) {
      this.topRatedTvSeriesSubscription.unsubscribe();
    }
  }
}
