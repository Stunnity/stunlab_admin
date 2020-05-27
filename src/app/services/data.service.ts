import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { Book } from "app/push-book/book.model";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private httpClient: HttpClient, private _router: Router) { }
  //Book SCRUD
  //Get all Books
  private BASE_URL: string = environment.BASE_API;
  getAllBooks(provider, page) {
    return this.httpClient.get(`${this.BASE_URL}/api/books?provid=${provider}&page=${page}`);
  }
  //Push a book
  uploadBook(data) {
    return this.httpClient.post(`${this.BASE_URL}/api/book`, data);
  }
  //Push Book Cover and File
  pushBookCredents(headers, myFormData) {
    return this.httpClient.post(
      `${this.BASE_URL}/api/books/file/post`,
      myFormData,
      {
        headers: headers,
      }
    );
  }
  usernameIsAvailable(username: String) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/user/exists/username/${username}`
    );
  }
  updateAdmin(admin, username) {
    return this.httpClient.post(
      `${this.BASE_URL}/api/admin/update/${username}`, admin);
  }
  //Delete Book
  deleteBook(id) {
    return this.httpClient.delete(`${this.BASE_URL}/api/book/` + id);
  }
  //Get book by Id
  getOneBook(id) {
    return this.httpClient.get(`${this.BASE_URL}/api/book/` + id);
  }
  //Patch a book
  updateBook(id, data) {
    return this.httpClient.put(`${this.BASE_URL}/api/book/` + id, data);
  }

  //Categories
  getCategories() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/category`);
  }
  //Levels
  getLevels() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/level`);
  }
  //Total Statistics
  //Number of uploaded books by Current Provider
  getProviderStats(admin: string) {
    console.log(admin)
    return this.httpClient.get(
      `${this.BASE_URL}/api/admin/statistics/${admin}`
    );
  }

  getAdmin(username: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/admin/details/${username}`
    );
  }
  getUnSeenNotification() {
    return this.httpClient.get(`${this.BASE_URL}/api/report`);
  }

  //Push a book
  postNotification(id, data) {
    return this.httpClient.patch(
      `${this.BASE_URL}/api/report/seen/` + id,
      data
    );
  }

  //Number of Total Downloads of Provider Type
  getTotalDownloads() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/downloads`);
  }
  //Register Users

  availableUsername() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/downloads`);
  }
  signUp(newUser) {
    return this.httpClient.post(`${this.BASE_URL}/api/admin/register`, newUser);
  }

  loginUser(user) {
    return this.httpClient.post(`${this.BASE_URL}/api/admin/login`, user, {
      observe: "response",
    });
  }

  signUpNewAdmin(admin) {
    return this.httpClient.post(`${this.BASE_URL}/api/admin/register`, admin);
  }

  searchBook(search: string, provider: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/search/query?q=${search}&provider=${provider}`
    );
  }
}
