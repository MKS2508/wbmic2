import { TestBed } from '@angular/core/testing';

import { RutinesServiceService } from './rutines-service.service';

describe('RutinesServiceService', () => {
  let service: RutinesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
