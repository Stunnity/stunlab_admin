import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SharedDataService } from "../services/shared-data/shared-data.service";
import { DataService } from "app/services/data.service";
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  {
    path: "/manage-books",
    title: "Manage Books",
    icon: "content_paste",
    class: "",
  },
  { path: "/statistics", title: "Statistics", icon: "subject", class: "" },
  { path: "/user-profile", title: "Profile", icon: "person", class: "" },
  { path: "/push-book", title: "Push Book", icon: "open_in_new", class: "" },
];
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  menuItems: any[];
  books: any;
  downloads: any;
  dislikes: any;
  users: any;
  loadStats: boolean = true;
  counter = 0;
  statistics: Object = {};
  isConnected = true;

  constructor(
    private dataService: DataService,
    private sharedDataService: SharedDataService
  ) { }
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  ngAfterViewInit() {
    this.sharedDataService.getDashboardNavigation().subscribe(data => {
      const dashboardNavigation = data;
      if (dashboardNavigation == 0) {
        this.sharedDataService.getLoggedUser().subscribe(data => {
          const provider = data["provider_providerName"];
          this.getProviderStatistics(provider);
        })
      }
      else {
        this.sharedDataService.getStatistics().subscribe(data => {
          this.statistics = data;
          console.log(data)
        });
        this.loadStats = false;
      }
    });
  }
  getProviderStatistics(provider: string) {
    try {
      this.dataService
        .getProviderStats(provider)
        .subscribe((res: any) => {
          this.sharedDataService.setStatistics(res);
        });
    } catch (error) {
      console.log(error)
    }

  }
}
