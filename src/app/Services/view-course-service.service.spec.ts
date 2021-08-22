import { TestBed } from '@angular/core/testing';

import { ViewCourseServiceService } from './view-course-service.service';

describe('ViewCourseServiceService', () => {
  let service: ViewCourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCourseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
