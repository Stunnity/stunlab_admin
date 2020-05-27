import { Routes } from "@angular/router";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { StatisticsComponent } from "../../statistics/statistics.component";
import { PushBookComponent } from "app/push-book/push-book.component";
import { EditBookComponent } from "../../edit-book/edit-book.component";
import { SearchComponent } from "../../search/search.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "manage-books", component: TableListComponent },
  { path: "statistics", component: StatisticsComponent },
  { path: "push-book", component: PushBookComponent },
  { path: "edit-book/:id", component: EditBookComponent },
  { path: "search/:search", component: SearchComponent },
];
