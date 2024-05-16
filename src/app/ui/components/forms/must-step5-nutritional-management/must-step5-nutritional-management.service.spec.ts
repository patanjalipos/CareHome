import { TestBed } from '@angular/core/testing';

import { MustStep5NutritionalManagementService } from './must-step5-nutritional-management.service';

describe('MustStep5NutritionalManagementService', () => {
  let service: MustStep5NutritionalManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MustStep5NutritionalManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
