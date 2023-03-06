import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tv-series-page',
  templateUrl: './tv-series-page.component.html',
  styleUrls: ['./tv-series-page.component.scss'],
})
export class TvSeriesPageComponent implements OnInit {
  popularTvSeries: MovieCard[] = [];
  topRatedTvSeries: MovieCard[] = [];

  constructor(private movieService: MovieService) {}

  moviesSubscription: Subscription;

  ngOnInit(): void {
    this.moviesSubscription = this.subscribeMovies();
  }

  subscribeMovies(): Subscription {
    return forkJoin({
      requestOne: this.movieService.getMovies(
        IVY_MOVIE_URL.POPULAR_TV_SERIES_URL,
        false,
        true
      ),
      requestTwo: this.movieService.getMovies(
        IVY_MOVIE_URL.TOP_RATED_TV_SERIES_URL,
        false,
        true
      ),
    }).subscribe(({ requestOne, requestTwo }) => {
      this.popularTvSeries = requestOne;
      this.topRatedTvSeries = requestTwo;
    });
  }
  ngOnDestroy() {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }
}
