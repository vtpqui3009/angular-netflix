import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { TvSeriesPageComponent } from './pages/tv-series-page/tv-series-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BackdropComponent } from './shared/components/backdrop/backdrop.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { MovieSwipperListComponent } from './shared/components/movie-swipper-list/movie-swipper-list.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    MoviesPageComponent,
    TvSeriesPageComponent,
    SearchPageComponent,
    NavigationComponent,
    BackdropComponent,
    MovieCardComponent,
    MainLayoutComponent,
    MovieSwipperListComponent,
    BannerCardComponent,
    MovieDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}