import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import {
  TMDB_IMAGE_URL,
  TMDB_URL,
  TMDB_API_KEY,
} from 'src/app/shared/constants/constant';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IVY_MOVIE_URL } from 'src/app/shared/constants/constant';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get(IVY_MOVIE_URL.TRENDING_PERSON_WITHIN_DAY_URL).pipe(
      map((response) => {
        let persons: Person[] = [];
        response['results'].map(
          (person: { id: number; name: string; profile_path: string }) => {
            persons.push({
              id: person.id,
              name: person.name,
              avatar:
                person.profile_path != null &&
                TMDB_IMAGE_URL + person.profile_path,
            });
          }
        );
        return persons;
      })
    );
  }
}
