import { TestBed } from '@angular/core/testing';

import { SaveCourseServiceService } from './save-course-service.service';

describe('SaveCourseServiceService', () => {
  let service: SaveCourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCourseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
