import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/app-data/data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: any;
  loginErrorOccurred: boolean;
  isLoading: boolean;
  btn_text: string;
  hide: boolean;
  errorMessage: string;
  constructor(
    private dataService: DataService,
    private _router: Router,
    private cookieService: CookieService
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),

      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.hide = true;
    this.btn_text = 'sign in';
  }
  login() {
    this.isLoading = true;
    this.btn_text = 'Signing in';
    this.dataService.loginUser(this.formGroup.value).subscribe(
      (res: any) => {
        const response = res.body;
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 20);
        this.cookieService.set('token', response.token, dateNow);
        this._router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.btn_text = 'Sign In';
        this.loginErrorOccurred = true;
        this.errorMessage = (error.status === 0) ? 'You aren"t connected to the Internet! 😓️😓' :
          'Invalid Username and Password';
      }
    );
  }
}
