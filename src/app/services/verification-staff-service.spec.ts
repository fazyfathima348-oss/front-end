import { TestBed } from '@angular/core/testing';

import { VerificationStaffService } from './verification-staff-service';

describe('VerificationStaffService', () => {
  let service: VerificationStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
