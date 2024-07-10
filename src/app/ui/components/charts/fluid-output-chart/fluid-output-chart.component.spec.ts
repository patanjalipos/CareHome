import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidOutputChartComponent } from './fluid-output-chart.component';

describe('FluidOutputChartComponent', () => {
  let component: FluidOutputChartComponent;
  let fixture: ComponentFixture<FluidOutputChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidOutputChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidOutputChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
