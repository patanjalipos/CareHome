import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteralFeedingChartComponent } from './enteral-feeding-chart.component';

describe('EnteralFeedingChartComponent', () => {
  let component: EnteralFeedingChartComponent;
  let fixture: ComponentFixture<EnteralFeedingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteralFeedingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnteralFeedingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
