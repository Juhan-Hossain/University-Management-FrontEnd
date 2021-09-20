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
  filteredList: department[] = [];
  selectedItem: any;
  myForm: FormGroup = new FormGroup({});
  myFormGroup() {
    this.myForm = this.formBuilder.group({
      courseCode: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      roomId: new FormControl('', Validators.required),
      dayId: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      FromMeridiem: new FormControl(''),
      ToMeridiem: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getDepartment();
    this.myFormGroup();
  }

  //fetching department
  getDepartment() {
    this.allocateClassroom.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      this.filteredList = data.data;
    });
  }
  getRoom() {
    this.allocateClassroom.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
    });
  }
  getDay() {
    this.allocateClassroom.getDay().subscribe((data: any) => {
      this.dayList = data.data;
    });
  }
  changeDeptId() {
    this.getDay();
    this.getRoom();
    this.myForm.controls['courseCode'].setValue('');
    this.selectedItem = this.myForm.controls.departmentId.value;
    console.log(this.myForm.controls.departmentId.value);
    this.allocateClassroom.getCourse(this.selectedItem).subscribe(
      (obj: any) => {
        this.courseList = obj.data;
        console.log(this.courseList);
      },
      (er: any) => {
        console.log(er.error.message);
        Swal.fire(er.error.message);
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
    console.log(this.myForm.value);
  }
  filterDropdown(e: any) {
    this.myFormGroup();
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
  print() {}
  onSubmit() {
    this.allocateClassroom.allocateClass(this.myForm.value).subscribe(
      (obj: any) => {
        this.myFormGroup();
        this.courseList = [];
        this.roomList = [];
        this.dayList = [];
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
}
