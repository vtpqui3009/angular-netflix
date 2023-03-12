import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { Person } from 'src/app/shared/models/person';
import {
  Subscription,
  forkJoin,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { MovieService } from 'src/app/core/services/movie.service';
import { SearchService } from 'src/app/core/services/search.service';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  movies: MovieCard[] = [];
  TVs: MovieCard[] = [];
  persons: Person[] = [];
  selectedTab: string = 'MOVIE';
  searchTerms = new Subject<string>();
  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  seachDataSubscription: Subscription;

  ngOnInit(): void {
    this.seachDataSubscription = this.subscribeSearchData();
    this.searchTerms
      .pipe(
        debounceTime(300), // wait 300ms after each keystroke before considering the term
        distinctUntilChanged()
      ) // ignore if next search term is same as previous
      .subscribe((value) => {
        this.onFilter(value);
      });
  }

  subscribeSearchData(): Subscription {
    return forkJoin({
      requestOne: this.movieService.getMovies(
        IVY_MOVIE_URL.TRENDING_MOVIE_WITHIN_DAY_URL
      ),
      requestTwo: this.movieService.getMovies(
        IVY_MOVIE_URL.TRENDING_TV_WITHIN_DAY_URL
      ),
      requestThree: this.searchService.getAllPersons(),
    }).subscribe(({ requestOne, requestTwo, requestThree }) => {
      this.movies = requestOne;
      this.TVs = requestTwo;
      this.persons = requestThree;
    });
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onSearch(event: any) {
    const value = event.target.value;
    this.searchTerms.next(value);
    this.searchTerms = null;
  }
  onFilter(value: string) {
    switch (this.selectedTab) {
      case 'TV':
        const filterTvs = this.TVs.filter((tv) =>
          tv.name.toLowerCase().includes(value.toLowerCase())
        );
        return filterTvs;
      case 'PERSON':
        const filterPersons = this.persons.filter((person) =>
          person.name.toLowerCase().includes(value.toLowerCase())
        );
        return filterPersons;
      default:
        const filterMovies = this.movies.filter((movie) => {
          movie.name.toLowerCase().includes(value.toLowerCase());
        });
        console.log(filterMovies);
        return filterMovies;
    }
  }

  ngOnDestroy(): void {
    if (this.seachDataSubscription) {
      this.seachDataSubscription.unsubscribe();
    }
  }
}
