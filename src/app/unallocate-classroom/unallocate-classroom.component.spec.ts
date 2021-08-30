import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnallocateClassroomComponent } from './unallocate-classroom.component';

describe('UnallocateClassroomComponent', () => {
  let component: UnallocateClassroomComponent;
  let fixture: ComponentFixture<UnallocateClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnallocateClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnallocateClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
