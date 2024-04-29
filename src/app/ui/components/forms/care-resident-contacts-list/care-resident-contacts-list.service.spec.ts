import { TestBed } from '@angular/core/testing';

import { CareResidentContactsListService } from './care-resident-contacts-list.service';

describe('CareResidentContactsListService', () => {
  let service: CareResidentContactsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareResidentContactsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
