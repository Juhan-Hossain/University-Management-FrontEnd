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
    private formBuilder: FormBuilder
  ) {}

  selectedItem: any;
  departmentList: department[] = [];
  courseList: any[] = [];
  departmentId = new FormControl();
  roomList: room[] = [];
  dayList: day[] = [];
  roomAllocationList: any[] = [];
  scheduleInfof: viewAllocatedRooms[] = [];

  ngOnInit() {
    this.getDepartment();
    this.getRoom();
    this.getDay();
  }

  getDepartment() {
    this.viewAllocatedRooms.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }
  getRoom() {
    this.viewAllocatedRooms.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
      console.log(this.roomList);
    });
  }
  getDay() {
    this.viewAllocatedRooms.getDay().subscribe((data: any) => {
      this.dayList = data.data;
      console.log(this.dayList);
    });
  }
  count: number = 0;
  code: string = "";
  name: string = "";
  print() {
    this.courseList = [];
    this.scheduleInfof = [];
    // this.viewAllocatedRooms
    this.viewAllocatedRooms.getCourse(this.departmentId.value).subscribe(
      (x) => {
        this.courseList = x.data;
        console.log(this.courseList);
        let list: any[] = [];
        let scheduleInfo = new viewAllocatedRooms('','','');
        for (let i = 0; i < this.courseList.length; i++) {
          // this.scheduleInfof = this.courseList[i].code;
          this.code = this.courseList[i].code;
          this.name = this.courseList[i].name;
          this.getRoomAllocation(this.courseList[i].code);
          // console.log(this.roomAllocationList);
          // if (this.roomAllocationList.length > 0) {
          //   for (let j = 0; j < this.roomAllocationList.length; j++) {

          //   }
          // }
          this.count++;
        }
      },
      (er) => {
        Swal.fire('no dept');
      }
    );
  }

  getRoomAllocation(courseCode: string) {
    // this.roomAllocationList=

    this.viewAllocatedRooms.getRoomsByCode(courseCode).subscribe(
      (obj) => {
        this.roomAllocationList.push(obj.data);
        if (this.count == this.courseList.length) {
          let schedule:viewAllocatedRooms = new viewAllocatedRooms('','','');
          console.log(this.roomAllocationList);

          // console.log(schedule.name);
          for (let j = 0; j < this.roomAllocationList.length; j++) {


            schedule.courseCode = this.roomAllocationList[j].courseCode;
            let coursename = this.courseList.find(
              (x: any) => x.code == schedule.courseCode
            )?.name;
            schedule.name = coursename;
            let roomid = this.roomAllocationList[j].roomId;
            console.log(roomid);
            let roomno = this.roomList.find(
              (x: any) => x.id == roomid
            )?.name;
            let dayid = this.roomAllocationList[j].dayId;
            let day = this.dayList.find(
              (x: any) => x.id == dayid
            )?.dayName;
            let starttime = this.roomAllocationList[j].dayId;
            let endtime = this.roomAllocationList[j].dayId;
            schedule.scheduleInfo += `R. No:${roomno},${day},${starttime}-${endtime};%0A`;
            this.scheduleInfof.push(schedule);
          }
        }
        console.log(this.scheduleInfof);
      },
      (er) => {}
    );
  }
}
