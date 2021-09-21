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

  public departmentList: department[] = [];
  public courseList: course[] = [];
  public roomList: room[] = [];
  public dayList: day[] = [];
  public filteredList: department[] = [];
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');

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
    // this.getDepartment();
    this.myFormGroup();
  }

  //fetching department
  public getDepartment() {
    this.allocateClassroom.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      this.filteredList = data.data;
    });
  }

  // public getDeptDDL(str:string) {

  // }

  public getRoom() {
    this.allocateClassroom.getRoom().subscribe((data: any) => {
      this.roomList = data.data;
    });
  }

  public getDay() {
    this.allocateClassroom.getDay().subscribe((data: any) => {
      this.dayList = data.data;
    });
  }

  public x: number = 0;

  public changeDeptId() {
    this.getDay();
    this.getRoom();

    console.log('->', this.myControl.value);
    this.x = this.myControl.value.id;
    this.myForm.controls['courseCode'].setValue('');
    this.myForm.controls.departmentId.setValue(this.myControl.value.name);
    this.allocateClassroom.getCourse(this.x).subscribe(
      (obj: any) => {
        this.courseList = obj.data;
        console.log('courselist value------->', this.courseList);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
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

  displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.myFormGroup();
    console.log('e in filterDropdown -------> ', e);
    this.allocateClassroom.getDeptDDL(e).subscribe(
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

  debounceTime(e: any) {
    setTimeout(() => {
      console.log(e.target.value);
      this.filterDropdown(e.target.value);
    }, 1000);
  }

  public onSubmit() {
    this.myForm.controls['departmentId'].setValue(this.x);
    this.allocateClassroom.allocateClass(this.myForm.value).subscribe(
      (obj: any) => {
        //clearing form & dropdown when success
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
