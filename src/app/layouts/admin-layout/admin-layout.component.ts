import { Component, OnInit } from "@angular/core";
import { Location, PopStateEvent } from "@angular/common";
import "rxjs/add/operator/filter";
import { Event, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import PerfectScrollbar from "perfect-scrollbar";
import { Observable, Observer, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import * as $ from "jquery";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import * as jwt_decode from "jwt-decode";
import { SharedDataService } from "../../services/shared-data/shared-data.service";
import { DataService } from "app/services/data.service";
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  private a_router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  status = "ONLINE";
  isConnected = true;
  showLoadingIndicator = true;

  loading = false;
  constructor(
    public location: Location,
    private lBar: SlimLoadingBarService,
    private _router: Router,
    private sharedData: SharedDataService,
    private dataService: DataService
  ) {
    this._router.events.subscribe((event: Event) => {
      this.loadingBarInterceptor(event);
    });
  }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.lBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.lBar.complete();
    }
  }

  ngOnInit() {
    const user = jwt_decode(this.sharedData.getToken());
    this.dataService.getAdmin(user.sub).subscribe((res) => {
      this.sharedData.setLoggedUser(res);
    });
    this.createOnline$().subscribe((isOnline) => console.log(isOnline));
    const isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (
      isWindows &&
      !document
        .getElementsByTagName("body")[0]
        .classList.contains("sidebar-mini")
    ) {
      document
        .getElementsByTagName("body")[0]
        .classList.add("perfect-scrollbar-on");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("perfect-scrollbar-off");
    }
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    const elemSidebar = <HTMLElement>(
      document.querySelector(".sidebar .sidebar-wrapper")
    );

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.a_router = this._router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }

    const window_width = $(window).width();
    let $sidebar = $(".sidebar");
    let $sidebar_responsive = $("body > .navbar-collapse");
    let $sidebar_img_container = $sidebar.find(".sidebar-background");

    if (window_width > 767) {
      if ($(".fixed-plugin .dropdown").hasClass("show-dropdown")) {
        $(".fixed-plugin .dropdown").addClass("open");
      }
    }

    $(".fixed-plugin a").click(function (event) {
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if ($(this).hasClass("switch-trigger")) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $(".fixed-plugin .badge").click(function () {
      let $full_page_background = $(".full-page-background");

      $(this).siblings().removeClass("active");
      $(this).addClass("active");

      var new_color = $(this).data("color");

      if ($sidebar.length !== 0) {
        $sidebar.attr("data-color", new_color);
      }

      if ($sidebar_responsive.length != 0) {
        $sidebar_responsive.attr("data-color", new_color);
      }
    });
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, "offline").pipe(map(() => false)),
      fromEvent(window, "online").pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
