import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  navigationTabs = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      link: '/',
    },
    {
      id: 2,
      name: 'Movies',
      icon: 'movie',
      link: '/movies',
    },
    {
      id: 3,
      name: 'TV Series',
      icon: 'tv',
      link: '/tv-series',
    },
    {
      id: 4,
      name: 'Search',
      icon: 'search',
      link: '/search',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
