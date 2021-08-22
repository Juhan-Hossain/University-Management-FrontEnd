import { TestBed } from '@angular/core/testing';

import { SaveTeacherServiceService } from './save-teacher-service.service';

describe('SaveTeacherServiceService', () => {
  let service: SaveTeacherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveTeacherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
