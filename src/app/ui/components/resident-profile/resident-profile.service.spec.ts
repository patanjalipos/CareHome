import { TestBed } from '@angular/core/testing';

import { ResidentProfileService } from './resident-profile.service';

describe('ResidentProfileService', () => {
  let service: ResidentProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
