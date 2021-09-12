import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllocateClassroomService } from '../services/allocate-classroom.service';
import { department } from '../Models/department';
import { course } from '../Models/course';
import { room } from '../Models/Room';
import { day } from '../Models/day';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-allocate-classroom',
  templateUrl: './allocate-classroom.component.html',
  styleUrls: ['./allocate-classroom.component.css'],
})
export class AllocateClassroomComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private allocateClassroom: AllocateClassroomService,
    private formBuilder: FormBuilder
  ) {}

  departmentList: department[] = [];
  courseList: course[] = [];
  roomList: room[] = [];
  dayList: day[] = [];
  selectedItem: any;
  myForm = this.formBuilder.group({
    courseCode: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    roomId: new FormControl('', Validators.required),
    dayId: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    FromMeridiem: new FormControl(''),
    ToMeridiem: new FormControl(''),
  });

  ngOnInit(): void {
    this.getDepartment();
    this.getRoom();
    this.getDay();
  }

  //fetching department
  getDepartment() {
    this.allocateClassroom.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      // console.log(data.data);
    });
  }
  getRoom() {
    this.allocateClassroom.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
      // console.log(data.data);
    });
  }
  getDay() {
    this.allocateClassroom.getDay().subscribe((data: any) => {
      this.dayList = data.data;
      console.log(this.dayList);
    });
  }
  changeDeptId(x: any) {
    this.selectedItem = x;
    // this.myForm.controls.departmentId.setValue(x);
    console.log(this.myForm.controls.departmentId.value);
    this.allocateClassroom.getCourse(x).subscribe(
      (obj: any) => {
        this.courseList = obj.data;
        console.log(this.courseList);
      },
      (er: any) => {
        console.log(er.error.message);
      }
    );
  }
  changeTime() {
    let start = this.myForm.controls.startTime.value;
    let end = this.myForm.controls.endTime.value;
    console.log(start);
    console.log(end);
    if (start >= 12 && start != '') {
      this.myForm.controls.FromMeridiem.setValue('PM');
    } else {
      this.myForm.controls.FromMeridiem.setValue('AM');
    }
    if (end >= 12 && end != '') {
      this.myForm.controls.ToMeridiem.setValue('PM');
    } else {
      this.myForm.controls.ToMeridiem.setValue('AM');
    }
    console.log(this.myForm.controls);
  }

  print() {
    console.log(this.myForm.controls.courseCode.value);
    console.log(this.myForm.controls.roomId.value);
    console.log(this.myForm.controls.dayId.value);
  }
  onSubmit() {
    this.allocateClassroom.allocateClass(this.myForm.value).subscribe(
      (obj: any) => {
        this.myForm.controls['courseCode'].setValue('');
        this.myForm.controls['departmentId'].setValue('');
        this.myForm.controls['roomId'].setValue('');
        this.myForm.controls['dayId'].setValue('');
        this.myForm.controls['startTime'].setValue('');
        this.myForm.controls['endTime'].setValue('');
        this.myForm.controls['FromMeridiem'].setValue('');
        this.myForm.controls['ToMeridiem'].setValue('');
        Swal.fire(obj.message);
      },
      (er: any) => {
        console.log(er.error.message);
        Swal.fire(er.error.message);
      }
    );
  }
}
