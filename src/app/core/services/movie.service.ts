import { MovieCard } from 'src/app/shared/models/movie-card';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared/models/genre';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
import { TMDB_IMAGE_URL } from 'src/app/shared/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  popularMovies: MovieCard[] = [];
  genres: Genre[] = [];
  constructor(private http: HttpClient) {}

  getAllGenresOfMovie(): Observable<Genre[]> {
    return this.http
      .get(IVY_MOVIE_URL.GENRES_ALL_OF_MOVIE_URL)
      .pipe(map((response) => response as Genre[]));
  }

  getPopularMovies(): Observable<MovieCard[]> {
    return this.http.get(IVY_MOVIE_URL.POPULAR_MOVIES_URL).pipe(
      map((response) => {
        let popularMovies: MovieCard[] = [];
        response['results'].forEach((movie: any) => {
          const picked = (({
            id,
            imageUrl: poster_path,
            year: release_date,
            title,
          }) => ({
            id,
            imageUrl: TMDB_IMAGE_URL + poster_path,
            year: new Date(release_date).getFullYear(),
            title,
          }))(movie);

          popularMovies.push(picked);
        });
        return popularMovies as MovieCard[];
      })
    );
  }
}
