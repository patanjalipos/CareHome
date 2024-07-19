import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsChartComponent } from './vital-signs-chart.component';

describe('VitalSignsChartComponent', () => {
  let component: VitalSignsChartComponent;
  let fixture: ComponentFixture<VitalSignsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalSignsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalSignsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
