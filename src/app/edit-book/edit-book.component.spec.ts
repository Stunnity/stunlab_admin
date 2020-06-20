import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookComponent } from './edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, MatSnackBarModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MatSnackBar]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
