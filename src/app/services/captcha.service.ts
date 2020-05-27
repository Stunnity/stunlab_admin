import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CaptchaService {
  url: string = environment.BASE_API + "verify/captcha";

  constructor(private http: HttpClient) {}

  post(captcha) {
    return this.http.post(this.url, { captcha: captcha });
  }
}
