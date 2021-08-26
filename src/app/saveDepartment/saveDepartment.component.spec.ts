import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDepartmentComponent } from './saveDepartment.component';

describe('SaveDepartmentComponent', () => {
  let component: SaveDepartmentComponent;
  let fixture: ComponentFixture<SaveDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
