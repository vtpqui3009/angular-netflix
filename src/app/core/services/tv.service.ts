import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieDetail } from 'src/app/shared/models/movie-detail';
import { MovieCard } from 'src/app/shared/models/movie-card';
import { YoutubeVideo } from 'src/app/shared/models/youtube-video';
import { Person } from 'src/app/shared/models/person';
import { Review } from 'src/app/shared/models/review';
import {
  TMDB_IMAGE_URL,
  TMDB_API_KEY,
  TMDB_URL,
  YOUTUBE_VIDEO_URL,
} from 'src/app/shared/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  constructor(private http: HttpClient) {}

  getTvSeriesDetail(id: number): Observable<MovieDetail> {
    const url = `${TMDB_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
    return this.http.get(url).pipe(
      map((response) => {
        let movie: MovieDetail;
        movie = {
          id: response['id'],
          posterUrl: TMDB_IMAGE_URL + response['poster_path'],
          backdropUrl:
            response['backdrop_path'] != null
              ? TMDB_IMAGE_URL + response['backdrop_path']
              : TMDB_IMAGE_URL + response['poster_path'],
          name: response['name'],
          overview: response['overview'],
          genres: response['genres'],
        };
        return movie;
      })
    );
  }

  getTvVideos(tvId: number): Observable<any> {
    const url = `${TMDB_URL}/tv/${tvId}/videos?api_key=${TMDB_API_KEY}&language=en-US`;
    return this.http.get(url).pipe(
      map((response) => {
        let tvVideos: YoutubeVideo[] = response['results'].map(
          (video: { id: number; key: string; name: string }) => {
            return {
              id: video.id,
              url: YOUTUBE_VIDEO_URL + video.key,
              name: video.name,
            };
          }
        );
        return tvVideos;
      })
    );
  }

  getTVCasts(id: number): Observable<Person[]> {
    const url = `${TMDB_URL}/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`;
    return this.http.get(url).pipe(
      map((response) => {
        let persons: Person[] = [];
        response['cast'].map(
          (person: { id: any; name: any; profile_path: string }) => {
            persons.push({
              id: person.id,
              name: person.name,
              avatar: TMDB_IMAGE_URL + person.profile_path,
            });
          }
        );
        return persons;
      })
    );
  }

  getTVReview(id: number): Observable<any> {
    const url = `${TMDB_URL}/tv/${id}/reviews?api_key=${TMDB_API_KEY}&append_to_response=videos`;
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

  getRelatedTV(id: number): Observable<MovieCard[]> {
    const url = `${TMDB_URL}/tv/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
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
}
