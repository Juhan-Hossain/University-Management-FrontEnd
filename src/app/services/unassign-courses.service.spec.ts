import { TestBed } from '@angular/core/testing';

import { UnassignCoursesService } from './unassign-courses.service';

describe('UnassignCoursesService', () => {
  let service: UnassignCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnassignCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
