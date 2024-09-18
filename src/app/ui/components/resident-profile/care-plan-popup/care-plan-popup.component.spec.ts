import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanPopupComponent } from './care-plan-popup.component';

describe('CarePlanPopupComponent', () => {
  let component: CarePlanPopupComponent;
  let fixture: ComponentFixture<CarePlanPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarePlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
