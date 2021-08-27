import { TestBed } from '@angular/core/testing';

import { CourseEnrollService } from './course-enroll.service';

describe('CourseEnrollService', () => {
  let service: CourseEnrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseEnrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
