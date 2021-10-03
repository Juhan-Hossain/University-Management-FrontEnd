import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewCourseService } from '../services/view-course.service';
import Swal from 'sweetalert2';
import { department } from '../Models/department';
import { course } from '../Models/course';
import { ViewAllocatedroomsService } from '../services/view-allocatedrooms.service';
import { roomAllocation } from '../Models/roomAllocation';
import { viewAllocatedRooms } from '../Models/viewAllocatedRooms';
import { room } from '../Models/Room';
import { day } from '../Models/day';
import { scheduled } from 'rxjs';
import { serviceResponse } from '../Models/serviceResponse';
import { RepositoryService } from '../services/repository.service';

interface VM {
  code: string;
  name: string;
  roomAllocations: any[];
}

interface Room {
  id: number;
  name: string;
}

interface VM2 {
  id: number;
  course: string;
  schedule: string;
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-view-allocated-rooms',
  templateUrl: './view-allocated-rooms.component.html',
  styleUrls: ['./view-allocated-rooms.component.css'],
})
export class ViewAllocatedRoomsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private viewAllocatedRooms: ViewAllocatedroomsService,
    private repository: RepositoryService
  ) {}

  public selectedItem: any;
  public departmentList: department[] = [];
  public filteredList: department[] = [];
  public courseList: any[] = [];
  public departmentId = new FormControl('');
  public roomList: Room[] = [];
  public dayList: day[] = [];
  public roomAllocationList: any[] = [];
  public scheduleInfof: [] = [];
  public myControl = new FormControl('');
  public count: number = 0;
  public data: VM[] = [];
  public data2: VM2[] = [];
  public check: Boolean = false;

  public ngOnInit() {
    this.getDepartment();
    this.getRoom();
    this.getDay();
  }

  public getDepartment() {
    this.repository.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }
  public getRoom() {
    this.viewAllocatedRooms.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
    });
  }
  public getDay() {
    this.viewAllocatedRooms.getDay().subscribe((data: any) => {
      this.dayList = data.data;
    });
  }

  public print() {
    this.courseList = [];
    this.scheduleInfof = [];
    console.log('deptId----->', this.myControl.value.id);

    this.viewAllocatedRooms.getCourse(this.myControl.value.id).subscribe(
      (x) => {
        this.courseList = x.data;
        console.log('####ScheduleList', this.roomAllocationList);
        this.data = x.data.map((course: any) => {
          return {
            code: course.code,
            name: course.name,
            roomAllocations: this.fixSchedule(course.code),
          };
        });
      },
      (er) => {
        this.data = [];
        this.departmentId.setValue('');
        Swal.fire('no dept data found');
      }
    );
    this.check = false;
  }
  public displayFn(option: department): string {
    return option.name;
  }

  public filterDropdown(e: string) {
    this.data = [];
    this.repository.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
    }
  }

  public getClassSchedule() {
    this.viewAllocatedRooms.getClassSchedule(this.myControl.value.id).subscribe(
      (obj) => {
        this.roomAllocationList = obj.data;
        this.data2 = this.roomAllocationList;
        if (!this.check) {
          this.check = true;
          this.print();
        }
      },
      (er) => {
        if (!this.check) {
          this.check = true;
          this.print();
        }
      }
    );
  }

  public fixSchedule(data: string) {
    if (this.roomAllocationList !== null) {
      let length = this.roomAllocationList.length;
      for (let i = 0; i < length; i++) {
        const element = this.roomAllocationList[i];
        if (element.course == data) {
          console.log(element.schedule);
          return element.schedule;
        } else return 'Not Scheduled Yet!';
      }
    } else {
      return 'Not Scheduled Yet!';
    }
  }
}
