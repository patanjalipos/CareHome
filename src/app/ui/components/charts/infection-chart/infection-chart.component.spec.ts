import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionChartComponent } from './infection-chart.component';

describe('InfectionChartComponent', () => {
  let component: InfectionChartComponent;
  let fixture: ComponentFixture<InfectionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfectionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfectionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
