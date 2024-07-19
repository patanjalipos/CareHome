import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeizureChartComponent } from './seizure-chart.component';

describe('SeizureChartComponent', () => {
  let component: SeizureChartComponent;
  let fixture: ComponentFixture<SeizureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeizureChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeizureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
