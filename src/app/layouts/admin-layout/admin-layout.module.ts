import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { StatisticsComponent } from '../../statistics/statistics.component';
import { EditBookComponent } from '../../edit-book/edit-book.component';
import { PushBookComponent } from 'app/push-book/push-book.component';
import { SearchComponent } from '../../search/search.component';
import { ReadBookComponent } from '../../read-book/read-book.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartModule } from 'primeng/chart';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatProgressBarModule,
    MatButtonModule,
    MatRippleModule,
    ChartModule,
    HttpClientModule,
    MatFormFieldModule,
    DropdownModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatTableModule,
    PdfViewerModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    EditBookComponent,
    PushBookComponent,
    ReadBookComponent,
    StatisticsComponent,
    SearchComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [

  ]
})
export class AdminLayoutModule { }
