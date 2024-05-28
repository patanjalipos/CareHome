import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviourChartComponent } from './behaviour-chart.component';

describe('BehaviourChartComponent', () => {
  let component: BehaviourChartComponent;
  let fixture: ComponentFixture<BehaviourChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviourChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviourChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
