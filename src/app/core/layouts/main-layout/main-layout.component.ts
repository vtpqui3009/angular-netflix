import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading: Boolean = false;
  loadingSubscription: Subscription;
  constructor(
    private movieService: MovieService,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadingSubscription = this.movieService.isLoading.subscribe(
      (response) => (this.isLoading = response)
    );
  }
  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
