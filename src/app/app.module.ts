import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
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
import { MatSnackBarModule } from "@angular/material/snack-bar";
// tslint:disable-next-line:max-line-length
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
  NgxUiLoaderRouterModule,
} from "ngx-ui-loader";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "#FF5656",
  fgsPosition: POSITION.centerCenter,
  fgsType: SPINNER.cubeGrid,
  fgsSize: 40,
  bgsSize: 30,
  bgsType: SPINNER.fadingCircle,
  bgsColor: "#FF5656",
  bgsPosition: POSITION.topCenter,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
  pbColor: "#FF5656",
  bgsOpacity: 1,
};
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecaptchaModule } from "ng-recaptcha";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { RegistrationComponent } from "./registration/registration.component";
import { FileUploadModule } from "primeng/fileupload";
import { SignupComponent } from "./adminForms/signup/signup.component";

import { ReadBookComponent } from "./read-book/read-book.component";
// import {LoadingInterceptorService } from './services/load-interceptor.service'
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button"; // added this
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
    FileUploadModule,
    MatInputModule,
    MatRippleModule,
    InputTextModule,
    NgxUiLoaderHttpModule,
    PdfJsViewerModule,
    MatFormFieldModule,
    ProgressSpinnerModule,
    BrowserModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderRouterModule,
    MatIconModule,
    SlimLoadingBarModule.forRoot(),
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    SignupComponent,
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
