import { MovieCard } from 'src/app/shared/models/movie-card';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieDetail } from 'src/app/shared/models/movie-detail';
import { Genre } from 'src/app/shared/models/genre';
import {
  IVY_MOVIE_URL,
  TMDB_IMAGE_URL,
  TMDB_API_KEY,
  TMDB_URL,
  YOUTUBE_VIDEO_URL,
} from 'src/app/shared/constants/constant';
import { YoutubeVideo } from '../../shared/models/youtube-video';
import { Person } from 'src/app/shared/models/person';
import { Review } from 'src/app/shared/models/review';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isLoading = new BehaviorSubject<boolean>(false);
  previousUrl: string = '';
  constructor(private http: HttpClient) {}

  getAllGenresOfMovie(): Observable<Genre[]> {
    return this.http
      .get(IVY_MOVIE_URL.GENRES_ALL_OF_MOVIE_URL)
      .pipe(map((response) => response['genres'] as Genre[]));
  }

  getMovies(
    url: string,
    isSelectedLagerImage: boolean = false
  ): Observable<MovieCard[]> {
    return this.http.get(url).pipe(
      map((response) => {
        let movies: MovieCard[] = [];
        response['results'].map((movie: any) => {
          movies.push({
            id: movie.id,
            type: movie.media_type,
            imageUrl:
              isSelectedLagerImage && movie.backdrop_path != null
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

  getMovieDetail(id: number): Observable<MovieDetail> {
    const url = `${TMDB_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`;
    return this.http.get(url).pipe(
      map((response) => {
        let movie: MovieDetail;
        let movieVideo: YoutubeVideo[] = response['videos']['results'].map(
          (video: { id: number; key: string; name: string }) => {
            return {
              id: video.id,
              url: YOUTUBE_VIDEO_URL + video.key,
              name: video.name,
            };
          }
        );
        movie = {
          id: response['id'],
          posterUrl: TMDB_IMAGE_URL + response['poster_path'],
          backdropUrl:
            response['backdrop_path'] != null
              ? TMDB_IMAGE_URL + response['backdrop_path']
              : TMDB_IMAGE_URL + response['poster_path'],
          name: response['title'],
          overview: response['overview'],
          genres: response['genres'],
          videos: movieVideo,
        };
        // console.log(movie);
        return movie;
      })
    );
  }

  getMovieCasts(id: number): Observable<Person[]> {
    const url = `${TMDB_URL}/movie/${id}/casts?api_key=${TMDB_API_KEY}`;
    return this.http.get(url).pipe(
      map((response) => {
        let persons: Person[] = [];
        response['cast'].map((person) => {
          persons.push({
            id: person.id,
            name: person.name,
            avatar:
              person.profile_path != null &&
              TMDB_IMAGE_URL + person.profile_path,
          });
        });
        return persons;
      })
    );
  }

  getMovieReview(id: number): Observable<any> {
    const url = `${TMDB_URL}/movie/${id}/reviews?api_key=${TMDB_API_KEY}`;
    return this.http.get(url).pipe(
      map((response) => {
        let reviews: Review[] = [];
        response['results'].map((review: any) => {
          reviews.push({
            id: review.id,
            avatar: TMDB_IMAGE_URL + review.author_details.avatar_path,
            author: review.author,
            createdAt: new Date(review.created_at).toLocaleString(),
            content: review.content,
          });
        });
        return reviews;
      })
    );
  }

  getRelatedMovies(id: number): Observable<MovieCard[]> {
    const url = `${TMDB_URL}/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    return this.http.get(url).pipe(
      map((response) => {
        let movies: MovieCard[] = [];
        response['results'].map((movie: any) => {
          movies.push({
            id: movie.id,
            type: movie.media_type,
            imageUrl: TMDB_IMAGE_URL + movie.poster_path,
            year: new Date(
              movie.release_date || movie.first_air_date
            ).getFullYear(),
            name: movie.title || movie.name,
          });
        });
        return movies;
      })
    );
  }

  getPersonDetail(id: number): Observable<Person> {
    const url = `${TMDB_URL}/person/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
    return this.http.get(url).pipe(
      map((response) => {
        let person: Person;
        person = {
          id: response['id'],
          avatar: TMDB_IMAGE_URL + response['profile_path'],
          name: response['name'],
          birthday: new Date(response['birthday']).getFullYear(),
          biography: response['biography'],
        };
        // console.log(person);
        return person;
      })
    );
  }

  getMovieCreditsOfPerson(id: number): Observable<MovieCard[]> {
    const url = `${TMDB_URL}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`;
    return this.http.get(url).pipe(
      map((response) => {
        let movies: MovieCard[] = [];
        response['cast'].map((movie: any) => {
          movies.push({
            id: movie.id,
            type: 'tv',
            imageUrl: TMDB_IMAGE_URL + movie.poster_path,
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
}
