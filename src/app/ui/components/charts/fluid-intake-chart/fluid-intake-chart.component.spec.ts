import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidIntakeChartComponent } from './fluid-intake-chart.component';

describe('FluidIntakeChartComponent', () => {
  let component: FluidIntakeChartComponent;
  let fixture: ComponentFixture<FluidIntakeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidIntakeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidIntakeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
