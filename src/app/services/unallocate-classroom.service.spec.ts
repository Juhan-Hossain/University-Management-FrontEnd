import { TestBed } from '@angular/core/testing';

import { UnallocateClassroomService } from './unallocate-classroom.service';

describe('UnallocateClassroomService', () => {
  let service: UnallocateClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnallocateClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
