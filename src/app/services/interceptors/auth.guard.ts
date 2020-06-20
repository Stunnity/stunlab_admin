import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedDataService } from '../shared-data/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: SharedDataService) { }
  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
