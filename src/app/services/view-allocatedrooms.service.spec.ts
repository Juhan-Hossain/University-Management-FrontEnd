import { TestBed } from '@angular/core/testing';

import { ViewAllocatedroomsService } from './view-allocatedrooms.service';

describe('ViewAllocatedroomsService', () => {
  let service: ViewAllocatedroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAllocatedroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
