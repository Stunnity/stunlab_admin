import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "../services/shared-data/shared-data.service";
import { DataService } from "app/services/app-data/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  menuItems: any[];
  books: any;
  downloads: any;
  dislikes: any;
  users: any;
  loadStats: boolean;
  counter = 0;
  statistics: Object = {};
  isConnected = true;

  constructor(
    private dataService: DataService,
    private sharedDataService: SharedDataService
  ) { }
  ngOnInit() {
    this.loadStats = true;
    this.sharedDataService.getDashboardNavigation().subscribe(value => {
      const dashboardNavigation = value;
      if (dashboardNavigation == 0) {
        this.sharedDataService.getLoggedUser().subscribe(user => {
          this.getProviderStatistics(user["provider_providerName"]);
        })
      }
      else {
        this.sharedDataService.getStatistics().subscribe(statistics => {
          this.statistics = statistics;
        });
        this.loadStats = false;
      }
    });
  }

  getProviderStatistics(provider: string) {
    try {
      if (provider == undefined)
        return;
      this.dataService
        .getProviderStats(provider)
        .subscribe((statistics: any) => {
          this.sharedDataService.setStatistics(statistics);
        });
    } catch (error) {

    }

  }
}
