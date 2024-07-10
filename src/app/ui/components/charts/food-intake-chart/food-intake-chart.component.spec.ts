import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodIntakeChartComponent } from './food-intake-chart.component';

describe('FoodIntakeChartComponent', () => {
  let component: FoodIntakeChartComponent;
  let fixture: ComponentFixture<FoodIntakeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodIntakeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodIntakeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
