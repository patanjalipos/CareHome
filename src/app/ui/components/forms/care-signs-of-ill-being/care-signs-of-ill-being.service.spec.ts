import { TestBed } from '@angular/core/testing';

import { CareSignsOfIllBeingService } from './care-signs-of-ill-being.service';

describe('CareSignsOfIllBeingService', () => {
  let service: CareSignsOfIllBeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareSignsOfIllBeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
