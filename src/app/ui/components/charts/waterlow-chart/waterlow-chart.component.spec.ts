import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterlowChartComponent } from './waterlow-chart.component';

describe('WaterlowChartComponent', () => {
  let component: WaterlowChartComponent;
  let fixture: ComponentFixture<WaterlowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterlowChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
