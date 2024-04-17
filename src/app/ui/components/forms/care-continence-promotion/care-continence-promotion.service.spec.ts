import { TestBed } from '@angular/core/testing';

import { CareContinencePromotionService } from './care-continence-promotion.service';

describe('CareContinencePromotionService', () => {
  let service: CareContinencePromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareContinencePromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
