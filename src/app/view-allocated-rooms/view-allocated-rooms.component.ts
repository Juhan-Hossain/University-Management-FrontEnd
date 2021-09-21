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

  public ngOnInit() {
    this.getDepartment();
    this.getRoom();
    this.getDay();
  }

  public getDepartment() {
    this.viewAllocatedRooms.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      // this.filteredList = data.data;
    });
  }
  public getRoom() {
    this.viewAllocatedRooms.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
      console.log('roomlist', this.roomList);
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
    this.viewAllocatedRooms.getCourse(this.myControl.value.id).subscribe(
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
  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.data = [];
    console.log('e in filterDropdown -------> ', e);
    this.viewAllocatedRooms.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
        console.log('####filteredList####', this.filteredList);
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public debounceTime(e: any) {
    setTimeout(() => {
      console.log(e.target.value);
      this.filterDropdown(e.target.value);
    }, 1000);
  }

  public getRoomAllocation(courseCode: string) {
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
    var hr = temp.getHours();
    var min = temp.getMinutes();
    if (hr <= 12) return hr + ':' + min + ' AM';
    return hr - 12 + ':' + min + ' PM';
  }
}
