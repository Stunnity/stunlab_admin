import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushBookComponent } from './push-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PushBookComponent', () => {
  let component: PushBookComponent;
  let fixture: ComponentFixture<PushBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PushBookComponent,],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MatSnackBar]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
