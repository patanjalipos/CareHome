import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareMentalHealthComponent } from './care-mental-health.component';

describe('CareMentalHealthComponent', () => {
  let component: CareMentalHealthComponent;
  let fixture: ComponentFixture<CareMentalHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareMentalHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareMentalHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
