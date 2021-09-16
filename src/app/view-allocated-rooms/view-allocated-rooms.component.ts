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

interface VM {
  code: string;
  name: string;
  roomAllocations: VM2[];
}

interface Room {
  id: number;
  name: string;
}

interface VM2 {
  dayId: number;
  roomId: string;
  startTime: string;
  endTime: string;
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
    private viewAllocatedRooms: ViewAllocatedroomsService
  ) {}

  selectedItem: any;
  departmentList: department[] = [];
  filteredList: department[] = [];
  courseList: any[] = [];
  departmentId = new FormControl('');
  roomList: Room[] = [];
  dayList: day[] = [];
  roomAllocationList: any[] = []; //any=<any>{};
  scheduleInfof: [] = [];

  ngOnInit() {
    this.getDepartment();
    this.getRoom();
    this.getDay();
  }

  getDepartment() {
    this.viewAllocatedRooms.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      this.filteredList = data.data;
    });
  }
  getRoom() {
    this.viewAllocatedRooms.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
      console.log('roomlist', this.roomList);
    });
  }
  getDay() {
    this.viewAllocatedRooms.getDay().subscribe((data: any) => {
      this.dayList = data.data;
    });
  }
  count: number = 0;
  // code: string = '';
  // name: string = '';
  data: VM[] = [];
  print() {
    this.courseList = [];
    this.scheduleInfof = [];
    // this.roomAllocationList = [];
    // this.departmentId.setValue('');
    this.viewAllocatedRooms.getCourse(this.departmentId.value).subscribe(
      (x) => {
        this.courseList = x.data;
        console.log('courseList', this.courseList);
        this.data = x.data.map((course: any) => {
          return {
            code: course.code,
            name: course.name,
            roomAllocations: course.roomAllocationLists,
          };
        });

        console.log('mapped data', this.data);
      },
      (er) => {
        this.data = [];
        this.departmentId.setValue('');
        Swal.fire('no dept data found');
      }
    );
  }
  filterDropdown(e: any) {
    this.departmentId.setValue('');
    this.data = [];
    console.log('e in filterDropdown -------> ', e.target.value);
    window.scrollTo(window.scrollX, window.scrollY + 1);

    let searchString = e.target.value.toLowerCase();
    if (!searchString) {
      this.filteredList = this.departmentList.slice();
      return;
    } else {
      this.filteredList = this.departmentList.filter(
        (dept) => dept.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log('this.filteredList indropdown -------> ', this.filteredList);
  }
  getRoomAllocation(courseCode: string) {
    this.viewAllocatedRooms.getRoomsByCode(courseCode).subscribe(
      (obj) => {
        if (obj.data.length >= 0) {
          for (let i = 0; i < obj.data.length; i++) {
            this.roomAllocationList.push(obj.data[i]);
          }
        }
      },
      (er) => {}
    );
  }

  public fixDay(data: number): string | undefined {
    let day = this.dayList.find((x: any) => x.id == data)?.dayName;

    return day;
  }
  public fixRoom(data: string): string | undefined {
    let roomno = this.roomList.find((x: any) => x.id == data)?.name;
    return roomno;
  }

  public dateConversion(date: any): string {
    var temp = new Date(date);
    var hr = temp.getHours() + 6;
    var min = temp.getMinutes();
    if (hr <= 12) return hr + ':' + min + ' AM';
    return hr - 12 + ':' + min + ' PM';
  }
}
