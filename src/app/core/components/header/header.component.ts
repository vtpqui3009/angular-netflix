import { Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { BannerCard } from 'src/app/shared/model/banner-card';
import { BANNER_MOCK_DATA } from 'src/app/shared/mock/mock-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  banners: BannerCard[] = [];
  ngOnInit(): void {
    this.banners = BANNER_MOCK_DATA;
  }
  config: SwiperOptions = {
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
