import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  login(user){
    this.httpClient.post('"https://quiet-escarpment-74371.herokuapp.com/api/book',  user);
  }
}
