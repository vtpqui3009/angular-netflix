import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { TvSeriesPageComponent } from './pages/tv-series-page/tv-series-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { PersonDetailPageComponent } from './pages/person-detail-page/person-detail-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'movies',
    component: MoviesPageComponent,
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },
  { path: 'tv-series', component: TvSeriesPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'persons', component: PersonPageComponent },
  { path: 'persons/:id', component: PersonDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
