import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanReviewComponent } from './care-plan-review.component';

describe('CarePlanReviewComponent', () => {
  let component: CarePlanReviewComponent;
  let fixture: ComponentFixture<CarePlanReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarePlanReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
