import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  isLoading: Boolean = false;
  constructor(public loader: LoaderService) {}
}
