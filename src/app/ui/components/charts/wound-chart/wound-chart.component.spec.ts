import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoundChartComponent } from './wound-chart.component';

describe('WoundChartComponent', () => {
  let component: WoundChartComponent;
  let fixture: ComponentFixture<WoundChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoundChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WoundChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
