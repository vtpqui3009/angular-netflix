import { Component, OnInit } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  popularMovies: MovieCard[] = [];
  topRatedMovies: MovieCard[] = [];

  constructor(private movieService: MovieService) {}

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
    }).subscribe(({ requestOne, requestTwo }) => {
      this.popularMovies = requestOne;
      this.topRatedMovies = requestTwo;
    });
  }
  ngOnDestroy() {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }
}
