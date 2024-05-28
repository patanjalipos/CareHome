import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdlChartComponent } from './adl-chart.component';

describe('AdlChartComponent', () => {
  let component: AdlChartComponent;
  let fixture: ComponentFixture<AdlChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdlChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
