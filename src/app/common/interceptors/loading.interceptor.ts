import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loadin.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      (req.method === 'POST' || req.method === 'PUT') &&
      req.url.includes('/heroes')
    ) {
      this.loadingService.setLoadingState(true);

      return next
        .handle(req)
        .pipe(finalize(() => this.loadingService.setLoadingState(false)));
    }

    return next.handle(req);
  }
}
