import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from '../services/course.service';
import Swal from 'sweetalert2';
import { department } from '../Models/department';
import { serviceResponse } from '../Models/serviceResponse';
@Component({
  selector: 'app-save-course',
  templateUrl: './save-course.component.html',
  styleUrls: ['./save-course.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class SaveCourseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) {}

  public departmentList: department[] = [];
  public filteredList: department[] = [];
  public semesterList: any;
  public isValidFormSubmitted = null;
  public errors: any;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.minLength(5)]),
      credit: new FormControl('', [
        Validators.required,
        Validators.max(5),
        Validators.min(0.5),
      ]),
      description: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      semesterId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getDepartment();
    this.getSemester();
    this.myFormGroup();
  }

  //get helper method manipulation
  public get registerFormControl() {
    return this.myForm.controls;
  }

  // cahnge departmentId by selection
  public changeDeptId() {
    this.myForm.controls['departmentId'].setValue(this.myControl.value.id);
  }

  // cahnge semesterId by selection
  public changeSemesterId(e: any) {
    this.myForm.controls['semesterId'].setValue(e, {
      onlySelf: true,
    });
  }

  //add course through value object
  public addCourse() {
    this.courseService.saveCourse(this.myForm.value).subscribe(
      (data: any) => {
        this.myFormGroup();
        this.myControl = new FormControl('');
        this.filteredList = [];
        Swal.fire(data.message);
      },
      (error: any) => {
        Swal.fire(error.error.message);
      }
    );
  }

  public getDepartment() {
    this.courseService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }

  public getSemester() {
    this.courseService.getSemester().subscribe((data: any) => {
      this.semesterList = data.data;
    });
  }

  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.filteredList = [];
    console.log('e in filterDropdown -------> ', e);
    this.courseService.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
        console.log('####filteredList####', this.filteredList);
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
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }
}
