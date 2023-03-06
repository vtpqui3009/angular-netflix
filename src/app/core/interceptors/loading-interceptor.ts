import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private movieService: MovieService) {}
  intercept(
    require: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(require).pipe(
      tap((event) => {
        this.movieService.isLoading.next(true);
        if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this.movieService.isLoading.next(false);
          }
        }
      })
    );
  }
}
