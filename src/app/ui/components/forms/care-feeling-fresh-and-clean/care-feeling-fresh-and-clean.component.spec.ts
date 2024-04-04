import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareFeelingFreshAndCleanComponent } from './care-feeling-fresh-and-clean.component';

describe('CareFeelingFreshAndCleanComponent', () => {
  let component: CareFeelingFreshAndCleanComponent;
  let fixture: ComponentFixture<CareFeelingFreshAndCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareFeelingFreshAndCleanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareFeelingFreshAndCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
