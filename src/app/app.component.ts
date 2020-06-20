import { Component, OnInit } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { SharedDataService } from './services/shared-data/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  loginStatus: boolean;
  constructor(
    private _router: Router,
    private sharedDataService: SharedDataService
  ) {
  }
  ngOnInit() {
    // this.loginStatus = this.sharedDataService.loggedIn();
    // if (!this.loginStatus) { this._router.navigate(['/login']); }
  }
}
