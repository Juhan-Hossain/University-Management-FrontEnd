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
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { serviceResponse } from '../Models/serviceResponse';
import { RepositoryService } from '../services/repository.service';

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
    private repository: RepositoryService,
    private formBuilder: FormBuilder
  ) {}
  public x: number = 0;
  public departmentList: department[] = [];
  public courseList: course[] = [];
  public roomList: room[] = [];
  public dayList: day[] = [];
  public filteredList: department[] = [];
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myDay = new FormControl('');
  public myRoom = new FormControl('');
  public myCode = new FormControl('');

  public myFormGroup() {
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
    this.myFormGroup();
  }

  public changeDayId() {
    this.myForm.controls['dayId'].setValue(this.myDay.value.id);
  }
  displayDay(option: day): string {
    return option.dayName;
  }

  public filterDay(e: string) {
    this.repository.getDay(e).subscribe(
      (data: serviceResponse) => {
        this.dayList = data.data;
      },
      (er: serviceResponse) => {
        this.dayList = [];
      }
    );
  }
  public dayKey: number = 0;
  public dayDDL(e: any) {
    if (e.timeStamp - this.dayKey > 1500) {
      this.filterDay(e.target.value);
      this.dayKey = e.timeStamp;
    }
  }

  public changeRoomId() {
    this.myForm.controls['roomId'].setValue(this.myRoom.value.id);
  }
  displayRoom(option: room): string {
    return option.name;
  }

  public filterRoom(e: string) {
    this.repository.getRoom(e).subscribe(
      (data: serviceResponse) => {
        this.roomList = data.data;
      },
      (er: serviceResponse) => {
        this.roomList = [];
      }
    );
  }
  public roomKey: number = 0;
  public roomDDL(e: any) {
    if (e.timeStamp - this.roomKey > 1500) {
      this.filterRoom(e.target.value);
      this.roomKey = e.timeStamp;
    }
  }
  public changeCourseCode() {
    this.myForm.controls['courseCode'].setValue(this.myCode.value.code);
  }
  public displayCourse(option: course): string {
    return option.name;
  }

  public filterCourse(e: string) {
    this.repository.getCourse(this.myControl.value.id, e).subscribe(
      (data: serviceResponse) => {
        this.courseList = data.data;
      },
      (er: serviceResponse) => {
        this.courseList = [];
      }
    );
  }
  public courseKey: number = 0;
  public courseDDL(e: any) {
    if (e.timeStamp - this.courseKey > 1500) {
      this.filterCourse(e.target.value);
      this.courseKey = e.timeStamp;
    }
  }
  public changeDeptId() {
    this.myFormGroup();
    this.courseList = [];
    this.roomList = [];
    this.dayList = [];
    this.myDay = new FormControl('');
    this.myRoom = new FormControl('');
    this.myCode = new FormControl('');
    this.x = this.myControl.value.id;
    this.myForm.controls['courseCode'].setValue('');
    this.myForm.controls['departmentId'].setValue(this.myControl.value.name);
  }
  displayFn(option: department): string {
    return option.name;
  }

  public filterDropdown(e: string) {
    this.myFormGroup();
    this.courseList = [];
    this.roomList = [];
    this.dayList = [];
    this.filteredList = [];
    console.log('e in filterDropdown -------> ', e);
    this.repository.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
        console.log('####filteredList####', this.filteredList);
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }

  print() {}

  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }
  public changeTime() {
    let start = this.myForm.controls.startTime.value;
    let end = this.myForm.controls.endTime.value;
    if (start <= 12 && start != '') {
      this.myForm.controls.FromMeridiem.setValue('PM');
    } else {
      this.myForm.controls.FromMeridiem.setValue('AM');
    }
    if (end <= 12 && end != '') {
      this.myForm.controls.ToMeridiem.setValue('PM');
    } else {
      this.myForm.controls.ToMeridiem.setValue('AM');
    }
    console.log('myFromGroup value------->', this.myForm.value);
  }

  public onSubmit() {
    console.log('----------><------', this.myForm.value);
    this.myForm.controls['departmentId'].setValue(this.x);
    this.allocateClassroom.allocateClass(this.myForm.value).subscribe(
      (obj: any) => {
        //clearing form & dropdown when success
        this.myFormGroup();
        this.courseList = [];
        this.roomList = [];
        this.dayList = [];
        this.filteredList = [];
        this.myControl = new FormControl('');
        this.myDay = new FormControl('');
        this.myRoom = new FormControl('');
        this.myCode = new FormControl('');
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
}
