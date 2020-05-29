import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from "jwt-decode"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  constructor(private _router: Router, private cookieService: CookieService) {
  }

  private User = new BehaviorSubject({});
  private statistics = new BehaviorSubject({});
  private dashboardNavigation = new BehaviorSubject(0);
  private dashboardCounter: number = 0;

  public bookNavigation = new BehaviorSubject(0);
  private bookNavigationCounter: number = 0;
  private bookPagination = new BehaviorSubject({});
  private pagesArray = new BehaviorSubject({})
  private Books = new BehaviorSubject({});
  private categories: any[];
  private levels: any[];
  private is_category_level_set: boolean = false;
  resetBookData() {
    this.bookNavigation.next(0);
    this.bookNavigationCounter = 0;
    this.bookPagination.next({});
    this.pagesArray.next({})
    this.Books.next({})
  }
  loggedIn() {
    const token = this.cookieService.get(`token`);
    if (!!token) {
      try {
        const user = jwt_decode(token);
        return true
      } catch (error) {
        return false;
      }
    }
    else
      return false;
  }

  logoutUser() {
    this.cookieService.delete(`token`);
    this.resetBookData();
    this._router.navigate(["/login"]);
  }
  getToken() {
    return this.cookieService.get("token");
  }
  setStatistics(stats: Object) {
    this.dashboardCounter++;
    this.setDashboardNavigation(this.dashboardCounter);
    this.statistics.next(stats);
  }
  setDashboardNavigation(value: number) {
    this.dashboardNavigation.next(value);
  }
  getDashboardNavigation() {
    return this.dashboardNavigation.asObservable();
  }
  setBookNavigation(value: number) {
    this.bookNavigation.next(value);
  }
  getBookNavigation() {
    return this.bookNavigation.asObservable();
  }
  setBookPagination(data) {
    this.bookPagination.next(data);
  }
  setPageArray(array) {
    this.pagesArray.next(array)
  }
  getPageArray() {
    return this.pagesArray.asObservable()
  }
  getBookPagination() {
    return this.bookPagination.asObservable();
  }
  getStatistics() {
    return this.statistics.asObservable();
  }
  setLoggedUser(user: Object) {
    this.User.next(user);
  }
  getBooks() {
    return this.Books;
  }

  setBooks(books: any[]) {
    this.bookNavigationCounter++;
    this.setBookNavigation(this.bookNavigationCounter);
    this.Books.next(books);
  }
  getLoggedUser() {
    return this.User.asObservable();
  }
  setCategoriesLevels(categories, levels) {
    this.categories = categories;
    this.levels = levels;
    this.is_category_level_set = true;
  }
  getCategoriesLevels() {
    return { categories: this.categories, levels: this.levels };
  }
  isCategoryLevelSet() {
    return this.is_category_level_set;
  }
}
