import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainChartComponent } from './pain-chart.component';

describe('PainChartComponent', () => {
  let component: PainChartComponent;
  let fixture: ComponentFixture<PainChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
