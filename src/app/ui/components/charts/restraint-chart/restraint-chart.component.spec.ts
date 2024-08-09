import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestraintChartComponent } from './restraint-chart.component';

describe('RestraintChartComponent', () => {
  let component: RestraintChartComponent;
  let fixture: ComponentFixture<RestraintChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestraintChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestraintChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
