import { Component, OnInit } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from "@angular/router";
import { DataService } from "./services/data.service";
import { SharedDataService } from "./services/shared-data/shared-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  showLoadingIndicator: boolean = true;
  loginStatus: boolean;
  constructor(
    private _router: Router,
    private sharedDataService: SharedDataService
  ) {
    // Subscribe to the router events observable
    this._router.events.subscribe((routerEvent: Event) => {
      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }
  ngOnInit() {
    this.loginStatus = this.sharedDataService.loggedIn();
    if (!this.loginStatus) this._router.navigate(["/login"]);
  }
}
