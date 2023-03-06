import { Component } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  isLoading: Boolean = false;
  constructor(private movieService: MovieService) {
    this.movieService.isLoading.subscribe((response) => {
      this.isLoading = response;
    });
  }
}
