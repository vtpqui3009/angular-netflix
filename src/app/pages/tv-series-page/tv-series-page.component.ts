import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-tv-series-page',
  templateUrl: './tv-series-page.component.html',
  styleUrls: ['./tv-series-page.component.scss'],
})
export class TvSeriesPageComponent implements OnInit {
  popularTvSeries: MovieCard[] = [];
  topRatedTvSeries: MovieCard[] = [];

  popularTvSeriesSubscription: Subscription;
  topRatedTvSeriesSubscription: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.popularTvSeriesSubscription = this.subscribePopularTvSeries();
    this.topRatedTvSeriesSubscription = this.subscribeTopRatedTvSeries();
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
    if (this.popularTvSeriesSubscription) {
      this.popularTvSeriesSubscription.unsubscribe();
    }
    if (this.topRatedTvSeriesSubscription) {
      this.topRatedTvSeriesSubscription.unsubscribe();
    }
  }
}
