import { MovieCard } from 'src/app/shared/models/movie-card';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genre } from 'src/app/shared/models/genre';
import { MovieDetail } from 'src/app/shared/models/movie-detail';
import {
  IVY_MOVIE_URL,
  TMDB_IMAGE_URL,
  LIMIT_PAGE_TMDB_ALLOW,
} from 'src/app/shared/constants/constant';
import { getRandomNumber } from 'src/app/shared/utilities/movie.util';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  popularMovies: MovieCard[] = [];
  genres: Genre[] = [];
  isLoading = new BehaviorSubject<Boolean>(false);
  constructor(private http: HttpClient) {}

  getAllGenresOfMovie(): Observable<Genre[]> {
    return this.http
      .get(IVY_MOVIE_URL.GENRES_ALL_OF_MOVIE_URL)
      .pipe(map((response) => response['genres'] as Genre[]));
  }

  getMovies(
    url: string,
    isSelectedLagerImage: boolean = false,
    isRenderWithPageParams: boolean = false
  ): Observable<MovieCard[]> {
    const randomPage = getRandomNumber(1, LIMIT_PAGE_TMDB_ALLOW);
    let modifiedUrl = isRenderWithPageParams
      ? url + `&page=${randomPage}`
      : url;
    return this.http.get(modifiedUrl).pipe(
      map((response) => {
        let movies: MovieCard[] = [];
        response['results'].map((movie: any) => {
          movies.push({
            id: movie.id,
            imageUrl: isSelectedLagerImage
              ? TMDB_IMAGE_URL + movie.backdrop_path
              : TMDB_IMAGE_URL + movie.poster_path,
            year: new Date(
              movie.release_date || movie.first_air_date
            ).getFullYear(),
            name: movie.title || movie.name,
            overview: movie.overview,
            genres: movie.genre_ids,
          });
        });
        return movies;
      })
    );
  }

  getMovieDetail(url: string): Observable<MovieDetail> {
    return this.http.get(url).pipe(
      map((response) => {
        // console.log(response);
        let movie: MovieDetail;
        movie = {
          id: response['id'],
          posterUrl: TMDB_IMAGE_URL + response['poster_path'],
          backdropUrl: TMDB_IMAGE_URL + response['backdrop_path'],
          name: response['title'],
          overview: response['overview'],
          genres: response['genres'],
          videos: response['videos']['results'],
        };
        console.log(movie);
        return movie;
      })
    );
  }
}
