import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { Genre } from 'src/app/shared/models/genre';
import { getModifiedMovies } from 'src/app/shared/utilities/movie.util';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  genres: Genre[] = [];
  trendingMoviesWithinDay: MovieCard[] = [];

  genresSubscription: Subscription;
  trendingMoviesWithinDaySubscription: Subscription;
  ngOnInit(): void {
    this.genresSubscription = this.subscribeGenres();
    this.trendingMoviesWithinDaySubscription =
      this.subscribeTrendingMoviesWithinDay();
  }
  subscribeGenres() {
    return this.movieService.getAllGenresOfMovie().subscribe((genres) => {
      this.genres = genres;
    });
  }
  subscribeTrendingMoviesWithinDay() {
    return this.movieService
      .getMovies(IVY_MOVIE_URL.TRENDING_MOVIE_WITHIN_DAY_URL, true)
      .subscribe((movies) => {
        this.trendingMoviesWithinDay = getModifiedMovies(movies, this.genres);
      });
  }
  ngOnDestroy(): void {
    if (this.trendingMoviesWithinDaySubscription) {
      this.trendingMoviesWithinDaySubscription.unsubscribe();
    }
    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }
  config: SwiperOptions = {
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
