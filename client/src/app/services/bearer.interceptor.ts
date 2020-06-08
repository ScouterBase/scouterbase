import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { switchMap } from 'rxjs/operators';

@Injectable()
// TODO: Use keycloak builtin interceptor (currently has an error)
export class BearerInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.keycloakService.getToken()).pipe(switchMap(token => {
      const newHeaders = request.headers.set('Authorization', 'bearer ' + token);
      const requestClone = request.clone({ headers: newHeaders });
      return next.handle(requestClone);
    }));
  }
}
