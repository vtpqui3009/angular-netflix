import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { MOVIES_DATA } from 'src/app/shared/mock/mock-data';
import { MovieCard } from 'src/app/shared/model/movie-card';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movies: MovieCard[] = [];
  ngOnInit(): void {
    this.movies = MOVIES_DATA;
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
