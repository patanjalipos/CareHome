import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGlucoseChartComponent } from './blood-glucose-chart.component';

describe('BloodGlucoseChartComponent', () => {
  let component: BloodGlucoseChartComponent;
  let fixture: ComponentFixture<BloodGlucoseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodGlucoseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodGlucoseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
