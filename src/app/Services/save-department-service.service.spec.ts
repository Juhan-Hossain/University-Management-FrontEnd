import { TestBed } from '@angular/core/testing';

import { SaveDepartmentServiceService } from './save-department-service.service';

describe('SaveDepartmentServiceService', () => {
  let service: SaveDepartmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveDepartmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
