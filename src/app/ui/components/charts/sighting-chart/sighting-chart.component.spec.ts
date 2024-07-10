import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingChartComponent } from './sighting-chart.component';

describe('SightingChartComponent', () => {
  let component: SightingChartComponent;
  let fixture: ComponentFixture<SightingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
