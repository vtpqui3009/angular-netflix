import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { MovieDetail } from 'src/app/shared/models/movie-detail';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { Person } from 'src/app/shared/models/person';
import { Review } from 'src/app/shared/models/review';
import { filter, pairwise } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { YoutubeVideo } from 'src/app/shared/models/youtube-video';
import { TvService } from 'src/app/core/services/tv.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private tvService: TvService
  ) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.movieService.previousUrl =
          events[0].urlAfterRedirects.split('/')[1];
      });
  }
  movie: MovieDetail;
  relatedVideos: MovieCard[];
  casts: Person[] = [];
  reviews: Review[] = [];
  movieVideo: YoutubeVideo[] = [];
  id: number;
  isToogleReview = false;
  reviewId: number;
  previousUrl = '';

  movieSubscription: Subscription;
  movieDetailSubscription: Subscription;
  previousRouteSubscription: Subscription;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.movieService.previousUrl === 'tv-series') {
      this.movieDetailSubscription = this.subscribeTVDetail();
    } else {
      this.movieDetailSubscription = this.subscribeMovieDetail();
    }
  }

  subscribePreviousRoute(): Subscription {
    return this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.movieService.previousUrl =
          events[0].urlAfterRedirects.split('/')[1];
      });
  }
  handleToogleReview(reviewId: number) {
    this.reviewId = reviewId;
    this.isToogleReview = !this.isToogleReview;
  }

  subscribeMovieDetail(): Subscription {
    return forkJoin({
      getMovieDetail: this.movieService.getMovieDetail(this.id),
      getCasts: this.movieService.getMovieCasts(this.id),
      getRelatedMovies: this.movieService.getRelatedMovies(this.id),
      getMovieReview: this.movieService.getMovieReview(this.id),
    }).subscribe(
      ({ getMovieDetail, getCasts, getRelatedMovies, getMovieReview }) => {
        this.movie = getMovieDetail;
        this.casts = getCasts;
        this.relatedVideos = getRelatedMovies;
        this.reviews = getMovieReview;
        this.movieVideo = this.movie.videos;
      }
    );
  }

  subscribeTVDetail(): Subscription {
    return forkJoin({
      getTVDetail: this.tvService.getTvSeriesDetail(this.id),
      getCasts: this.tvService.getTVCasts(this.id),
      getRelatedMovies: this.tvService.getRelatedTV(this.id),
      getMovieReview: this.tvService.getTVReview(this.id),
      getMovieVideos: this.tvService.getTvVideos(this.id),
    }).subscribe(
      ({
        getTVDetail,
        getCasts,
        getRelatedMovies,
        getMovieReview,
        getMovieVideos,
      }) => {
        this.movie = getTVDetail;
        this.casts = getCasts;
        this.relatedVideos = getRelatedMovies;
        this.reviews = getMovieReview;
        this.movieVideo = getMovieVideos;
      }
    );
  }
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: { clickable: true },
  };
  castConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      // when window width is >= 0
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  };

  ngOnDestroy() {
    if (this.movieDetailSubscription) {
      this.movieDetailSubscription.unsubscribe();
    }
    if (this.previousRouteSubscription) {
      this.previousRouteSubscription.unsubscribe();
    }
  }
}
