import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { forkJoin } from 'rxjs';

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

  moviesSubscription: Subscription;

  ngOnInit(): void {
    this.moviesSubscription = this.subscribeMovies();
  }

  subscribeMovies(): Subscription {
    return forkJoin({
      requestOne: this.movieService.getMovies(
        IVY_MOVIE_URL.TOP_RATED_MOVIES_URL,
        false,
        true
      ),
      requestTwo: this.movieService.getMovies(
        IVY_MOVIE_URL.TOP_RATED_MOVIES_URL,
        false,
        true
      ),
      requestThree: this.movieService.getMovies(
        IVY_MOVIE_URL.POPULAR_TV_SERIES_URL,
        false,
        true
      ),
      requestFourth: this.movieService.getMovies(
        IVY_MOVIE_URL.TOP_RATED_TV_SERIES_URL,
        false,
        true
      ),
    }).subscribe(({ requestOne, requestTwo, requestThree, requestFourth }) => {
      this.popularMovies = requestOne;
      this.topRatedMovies = requestTwo;
      this.popularTvSeries = requestThree;
      this.topRatedTvSeries = requestFourth;
    });
  }
  ngOnDestroy() {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }
}
