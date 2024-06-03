import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiteReservationComponent } from './suite-reservation.component';

describe('SuiteReservationComponent', () => {
  let component: SuiteReservationComponent;
  let fixture: ComponentFixture<SuiteReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuiteReservationComponent]
    });
    fixture = TestBed.createComponent(SuiteReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
