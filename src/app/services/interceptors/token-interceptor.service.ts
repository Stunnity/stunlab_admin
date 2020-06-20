import { Injectable, Injector } from '@angular/core';
import { SharedDataService } from '../shared-data/shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private _injector: Injector) { }
  intercept(req, next) {
    try {
      const authService = this._injector.get(SharedDataService);
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    } catch (error) {

    }

  }

}
