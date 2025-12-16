import { TestBed } from '@angular/core/testing';

import { PublicProperty } from './public-property';

describe('PublicProperty', () => {
  let service: PublicProperty;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicProperty);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
