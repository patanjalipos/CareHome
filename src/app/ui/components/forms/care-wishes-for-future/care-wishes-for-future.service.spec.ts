import { TestBed } from '@angular/core/testing';

import { CareWishesForFutureService } from './care-wishes-for-future.service';

describe('CareWishesForFutureService', () => {
  let service: CareWishesForFutureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareWishesForFutureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
