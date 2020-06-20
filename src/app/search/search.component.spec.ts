import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// tslint:disable-next-line: max-line-length
import { MatHeaderRow, MatTabHeader, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent,
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
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
