import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlasgowComaScaleChartComponent } from './glasgow-coma-scale-chart.component';

describe('GlasgowComaScaleChartComponent', () => {
  let component: GlasgowComaScaleChartComponent;
  let fixture: ComponentFixture<GlasgowComaScaleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlasgowComaScaleChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlasgowComaScaleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
