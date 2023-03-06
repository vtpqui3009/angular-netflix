import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading-interceptor';

import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HeaderAndFooterLayoutComponent } from './core/layouts/header-and-footer-layout/header-and-footer-layout.component';

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
import { MovieSwipperListComponent } from './shared/components/movie-swipper-list/movie-swipper-list.component';
import { BannerCardComponent } from './shared/components/banner-card/banner-card.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { PersonDetailPageComponent } from './pages/person-detail-page/person-detail-page.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
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
    HeaderAndFooterLayoutComponent,
    MovieSwipperListComponent,
    BannerCardComponent,
    MovieDetailComponent,
    PersonPageComponent,
    PersonDetailPageComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
