import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignCoursesComponent } from './unassign-courses.component';

describe('UnassignCoursesComponent', () => {
  let component: UnassignCoursesComponent;
  let fixture: ComponentFixture<UnassignCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
