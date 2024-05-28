import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidCombinedChartComponent } from './fluid-combined-chart.component';

describe('FluidCombinedChartComponent', () => {
  let component: FluidCombinedChartComponent;
  let fixture: ComponentFixture<FluidCombinedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidCombinedChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidCombinedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
