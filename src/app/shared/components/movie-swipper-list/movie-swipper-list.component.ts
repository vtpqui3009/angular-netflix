import { Component, Input, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { MovieCard } from '../../model/movie-card';

@Component({
  selector: 'app-movie-swipper-list',
  templateUrl: './movie-swipper-list.component.html',
  styleUrls: ['./movie-swipper-list.component.scss'],
})
export class MovieSwipperListComponent implements OnInit {
  @Input() movies: MovieCard[];

  config: SwiperOptions = {
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      // when window width is >= 0
      0: {
        slidesPerView: 2,
        // spaceBetween: 10,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 3,
        // spaceBetween: 10,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        // spaceBetween: 10,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 4,
        // spaceBetween: 10,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 5,
        // spaceBetween: 10,
      },
    },
  };

  ngOnInit() {}
}
