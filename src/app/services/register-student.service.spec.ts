import { TestBed } from '@angular/core/testing';

import { RegisterStudentService } from './register-student.service';

describe('RegisterStudentService', () => {
  let service: RegisterStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
