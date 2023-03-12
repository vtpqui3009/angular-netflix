import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieCard } from 'src/app/shared/models/movie-card';
import { MovieService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-person-detail-page',
  templateUrl: './person-detail-page.component.html',
  styleUrls: ['./person-detail-page.component.scss'],
})
export class PersonDetailPageComponent implements OnInit, OnDestroy {
  personId: number;
  person: Person;
  personMovies: MovieCard[] = [];

  personDetailSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.personId = +this.route.snapshot.paramMap.get('id');
    this.personDetailSubscription = this.subscribePersonDetail();
  }

  subscribePersonDetail(): Subscription {
    return forkJoin({
      requestOne: this.movieService.getPersonDetail(this.personId),
      requestTwo: this.movieService.getMovieCreditsOfPerson(this.personId),
    }).subscribe(({ requestOne, requestTwo }) => {
      this.person = requestOne;
      this.personMovies = requestTwo.slice(0, 8);
    });
  }
  ngOnDestroy(): void {
    if (this.personDetailSubscription) {
      this.personDetailSubscription.unsubscribe();
    }
  }
}
