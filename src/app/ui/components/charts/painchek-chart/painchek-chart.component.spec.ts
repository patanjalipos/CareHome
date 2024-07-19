import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainchekChartComponent } from './painchek-chart.component';

describe('PainchekChartComponent', () => {
  let component: PainchekChartComponent;
  let fixture: ComponentFixture<PainchekChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainchekChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainchekChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
