import { TestBed } from '@angular/core/testing';

import { FoodIntakeChartService } from './food-intake-chart.service';

describe('FoodIntakeChartService', () => {
  let service: FoodIntakeChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodIntakeChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
