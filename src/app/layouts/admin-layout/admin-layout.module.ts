import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgxFileDropModule } from "ngx-file-drop";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { StatisticsComponent } from "../../statistics/statistics.component";
import { EditBookComponent } from "../../edit-book/edit-book.component";
import { PushBookComponent } from "app/push-book/push-book.component";
import { SearchComponent } from "../../search/search.component";
import { MatFileUploadModule } from "angular-material-fileupload";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive"; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from "angular2-moment"; // optional, provides moment-style pipes for date formatting
import { ModalModule } from "ngx-bootstrap/modal";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { MatStepperModule } from "@angular/material/stepper";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FileUploadModule } from "primeng/fileupload";

import { FileSelectDirective } from "ng2-file-upload";
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../services/auth.interceptor'
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
} from "@angular/material";
import { ChartModule } from "primeng/chart";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    ChartModule,
    NgxFileDropModule,
    MatFileUploadModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FileUploadModule,
    MatTableModule,
    // BrowserModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MatSnackBarModule,
    PdfViewerModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ModalModule.forRoot(),
    MatSlideToggleModule,
    MatSelectModule,
    MatStepperModule,
    MatAutocompleteModule,
    MDBBootstrapModule,
    MatTooltipModule,

    NgxPaginationModule,
    MatSortModule,
    MatPaginatorModule,
    NgxExtendedPdfViewerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    FileSelectDirective,
    EditBookComponent,
    PushBookComponent,
    StatisticsComponent,
    SearchComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [

  ]
})
export class AdminLayoutModule { }
