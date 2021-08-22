import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignTOTeacherComponent } from './course-assign-to-teacher.component';

describe('CourseAssignTOTeacherComponent', () => {
  let component: CourseAssignTOTeacherComponent;
  let fixture: ComponentFixture<CourseAssignTOTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAssignTOTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignTOTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
