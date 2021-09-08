import { TestBed } from '@angular/core/testing';

import { ViewResultService } from './view-result.service';

describe('ViewResultService', () => {
  let service: ViewResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
