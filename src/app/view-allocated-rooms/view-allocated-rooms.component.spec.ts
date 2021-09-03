import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllocatedRoomsComponent } from './view-allocated-rooms.component';

describe('ViewAllocatedRoomsComponent', () => {
  let component: ViewAllocatedRoomsComponent;
  let fixture: ComponentFixture<ViewAllocatedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllocatedRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllocatedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
