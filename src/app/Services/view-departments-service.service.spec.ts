import { TestBed } from '@angular/core/testing';

import { ViewDepartmentsServiceService } from './view-departments-service.service';

describe('ViewDepartmentsServiceService', () => {
  let service: ViewDepartmentsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDepartmentsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
