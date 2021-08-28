import { TestBed } from '@angular/core/testing';

import { AllocateClassroomService } from './allocate-classroom.service';

describe('AllocateClassroomService', () => {
  let service: AllocateClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocateClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
