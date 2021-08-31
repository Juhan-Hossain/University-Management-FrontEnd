import { TestBed } from '@angular/core/testing';

import { CourseAssignService } from './course-assign.service';

describe('CourseAssignService', () => {
  let service: CourseAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
