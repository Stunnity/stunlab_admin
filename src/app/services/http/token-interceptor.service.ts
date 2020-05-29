import { Injectable, Injector } from "@angular/core";
import { SharedDataService } from "../shared-data/shared-data.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService {
  constructor(private _injector: Injector) { }
  intercept(req, next) {
    try {
      let authService = this._injector.get(SharedDataService);
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    } catch (error) {

    }

  }

}
