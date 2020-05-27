import { Injectable, Injector } from "@angular/core";
import { SharedDataService } from "./shared-data/shared-data.service";
import { retry, retryWhen, flatMap, scan, delay, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService {
  constructor(private _injector: Injector) { }
  intercept(req, next) {
    let authService = this._injector.get(SharedDataService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }

  // return next.handle(tokenizedReq).pipe(
  //   retryWhen(err => err.pipe(
  //     scan(
  //       (retryCount, err) => {

  //         if (retryCount > 3)
  //           throw err;
  //         else
  //           return retryCount + 1;
  //       }, 0
  //     ),
  //     delay(1000),
  //     tap(err => console.log("Retrying...", err))
  //   )));
}
