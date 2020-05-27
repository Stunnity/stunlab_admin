import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "../app/adminForms/signup/signup.component";
import { ReadBookComponent } from "../app/read-book/read-book.component";

const routes: Routes = [
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent,
  },
  {
    path: "admin/signup",
    pathMatch: "full",
    component: SignupComponent,
  },
  {
    path: "signup",
    pathMatch: "full",
    component: RegistrationComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "view/book/:id",
    pathMatch: "full",
    component: ReadBookComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
  { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
