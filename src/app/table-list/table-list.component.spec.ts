import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponent } from './table-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable-next-line: max-line-length
import { MatHeaderRow, MatTabHeader, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef, MatSnackBarModule, MatSnackBar } from '@angular/material';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableListComponent,
        MatTabHeader,
        MatHeaderRow,
        MatHeaderCell,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatSortHeader,
        MatRow,
        MatRowDef,
        MatCell,
        MatCellDef],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [MatSnackBar],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
