import { TestBed } from '@angular/core/testing';

import { DistrictNurseVisitCommunicationService } from './district-nurse-visit-communication.service';

describe('DistrictNurseVisitCommunicationService', () => {
  let service: DistrictNurseVisitCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictNurseVisitCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
