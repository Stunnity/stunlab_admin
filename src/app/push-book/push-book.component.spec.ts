import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushBookComponent } from './push-book.component';

describe('PushBookComponent', () => {
  let component: PushBookComponent;
  let fixture: ComponentFixture<PushBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushBookComponent ]
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
