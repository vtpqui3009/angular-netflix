import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-header-and-footer-layout',
  templateUrl: './header-and-footer-layout.component.html',
  styleUrls: ['./header-and-footer-layout.component.scss'],
})
export class HeaderAndFooterLayoutComponent {
  constructor(public loader: LoaderService) {}
}
