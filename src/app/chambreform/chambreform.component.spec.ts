import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreformComponent } from './chambreform.component';

describe('ChambreformComponent', () => {
  let component: ChambreformComponent;
  let fixture: ComponentFixture<ChambreformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChambreformComponent]
    });
    fixture = TestBed.createComponent(ChambreformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
