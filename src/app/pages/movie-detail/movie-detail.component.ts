import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieDetail } from 'src/app/shared/models/movie-detail';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  movie: MovieDetail;
  movieId: number;
  movieSubscription: Subscription;
  youtubeVideoKey = 'https://www.youtube-nocookie.com/embed/';
  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.movieSubscription = this.subscribeMovie();
  }
  subscribeMovie(): Subscription {
    const url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=fa808d4f7fd1ba7f2fedd0e4ebb1add1&append_to_response=videos`;
    // console.log(url);
    return this.movieService.getMovieDetail(url).subscribe((response) => {
      this.movie = response;
      // console.log(this.movie.videos);
      // console.log(youtubeVideoKey +  this.movie.video.key)
    });
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
}
