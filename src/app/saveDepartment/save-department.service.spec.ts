import { TestBed } from '@angular/core/testing';

import { SaveDepartmentService } from './save-departmentService.service';

describe('SaveDepartmentService', () => {
  let service: SaveDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
