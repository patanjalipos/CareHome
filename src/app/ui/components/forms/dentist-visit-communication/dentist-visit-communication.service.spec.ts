import { TestBed } from '@angular/core/testing';

import { DentistVisitCommunicationService } from './dentist-visit-communication.service';

describe('DentistVisitCommunicationService', () => {
  let service: DentistVisitCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentistVisitCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
