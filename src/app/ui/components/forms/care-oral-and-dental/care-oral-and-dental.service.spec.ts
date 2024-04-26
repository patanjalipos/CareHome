import { TestBed } from '@angular/core/testing';

import { CareOralAndDentalService } from './care-oral-and-dental.service';

describe('CareOralAndDentalService', () => {
  let service: CareOralAndDentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareOralAndDentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
