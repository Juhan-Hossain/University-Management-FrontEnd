import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseStatComponent } from './view-course-stat.component';

describe('ViewCourseStatComponent', () => {
  let component: ViewCourseStatComponent;
  let fixture: ComponentFixture<ViewCourseStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
