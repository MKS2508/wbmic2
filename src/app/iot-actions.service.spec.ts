import { TestBed } from '@angular/core/testing';

import { IotActionsService } from './iot-actions.service';

describe('IotActionsService', () => {
  let service: IotActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
