import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import { HttpCancelService } from "./services/http/http-cancel.service";
import { ManageHttpInterceptor } from "./services/http/managehttp.interceptor";
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatIconModule,
  MatSelectModule,
} from "@angular/material";

import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { TokenInterceptorService } from "./services/http/token-interceptor.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecaptchaModule } from "ng-recaptcha";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ReadBookComponent } from "./read-book/read-book.component";
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    HttpModule,
    ComponentsModule,
    RecaptchaModule.forRoot(),
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,

    BrowserModule,

    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    PdfJsViewerModule,
    MatSelectModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    ReadBookComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    CookieService,
    HttpCancelService,
    { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
