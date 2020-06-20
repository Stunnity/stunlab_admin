import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/app-data/data.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'app/services/shared-data/shared-data.service';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/push-book', title: 'Push Book', icon: 'present_to_all', class: '' },
  { path: '/edit-book', title: 'Edit Book', icon: 'mode_edit', class: 'disabled-link' },
  { path: '/manage-books', title: 'Manage Books', icon: 'chrome_reader_mode', class: '' },
  { path: '/statistics', title: 'Statistics', icon: 'assessment', class: '' },
  { path: '/profile', title: 'Profile', icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  notifications: any;
  displayNotifications: boolean;
  count: any;
  data = 'Seen';
  location: Location;
  search: String;
  active_user: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    private sharedData: SharedDataService
  ) { }

  ngOnInit() {
    this.displayNotifications = false;
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.getCurrentUser();

  }

  getCurrentUser() {
    this.sharedData.getLoggedUser().subscribe(user => {
      this.active_user = user['provider_providerName'];
    });
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  getNotifications() {
    this.dataService.getUnSeenNotification().subscribe((notifications) => {
      this.notifications = notifications;
      this.count = this.notifications.length;
      if (this.count > 0) { this.displayNotifications = true; }
    });
  }

  seenNotifications(id) {
    this.dataService.postNotification(id, this.data).subscribe((notifications) => {
      console.log(notifications);
      this.getNotifications();
    });
  }
  searchBook(search: string) {
    this.router.navigate([`search/${search}`]);
  }
}
