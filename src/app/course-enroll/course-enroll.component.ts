import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseEnrollService } from '../services/course-enroll.service';
import { course } from '../Models/course';
import Swal from 'sweetalert2';
import { student } from '../Models/student';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { serviceResponse } from '../Models/serviceResponse';
import { department } from '../Models/department';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-course-enroll',
  templateUrl: './course-enroll.component.html',
  styleUrls: ['./course-enroll.component.css'],
})
export class CourseEnrollComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private courseEnroll: CourseEnrollService,
    private formBuilder: FormBuilder
  ) {}
  public studentList: any;
  public filteredList: any;
  public courseList: course[] = [];
  public depatmentList: any;
  public selectedStudent: any;
  public selectedCourse: course[] = [];
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public p = 0;
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(''),
      department: new FormControl(''),
      email: new FormControl(''),
      date: new FormControl('', Validators.required),
      studentRegNo: new FormControl('', Validators.required),
      courseCode: new FormControl('', Validators.required),
    });
  }

  updatedForm = this.formBuilder.group({
    studentRegNo: new FormControl('', Validators.required),
    courseCode: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getStudents();
    this.getDepartments();
    this.myFormGroup();
  }

  //get helper method manipulation
  public get myFormControl() {
    return this.myForm.controls;
  }

  // cahnge departmentId by selection
  public changeId() {
    this.selectedStudent = this.myControl.value;
    this.myForm.controls.studentRegNo.setValue(this.selectedStudent);
    this.myForm.controls['courseCode'].setValue('');
    this.courseEnroll.getCourse(this.selectedStudent).subscribe(
      (obj1) => {
        this.getDepartments();
        this.courseList = obj1.data;

        let selectedStdDeptId = this.studentList.find(
          (x: { registrationNumber: string }) =>
            x.registrationNumber === this.selectedStudent
        ).departmentId;

        let selectedStdName = this.studentList.find(
          (x: { registrationNumber: string }) =>
            x.registrationNumber === this.selectedStudent
        ).name;
        let selectedStdEmail = this.studentList.find(
          (x: { registrationNumber: string }) =>
            x.registrationNumber === this.selectedStudent
        ).email;

        let departmentName = this.depatmentList.find(
          (x: { id: number }) => x.id === selectedStdDeptId
        ).name;

        this.myForm.controls.department.setValue(departmentName);

        this.myForm.controls.name.setValue(selectedStdName);
        this.myForm.controls.email.setValue(selectedStdEmail);
      },
      (er1: any) => {
        console.log(er1);
        alert(er1.error.message);
      }
    );
  }
  public changeFormControl(x: any) {
    this.myForm.controls.courseId.setValue(x);
  }

  //add course through value object
  public getStudents() {
    this.courseEnroll.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
      // this.filteredList = data.data;
    });
    console.log(new Date().toLocaleTimeString());
  }
  public getDepartments() {
    this.courseEnroll.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }

  public filterDropdown(e: string) {
    this.myFormGroup();
    this.myForm.controls.studentRegNo.setValue('');
    this.myForm.controls['courseCode'].setValue('');
    console.log('e in filterDropdown -------> ', e);
    this.courseEnroll.getStdDDL(e).subscribe(
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
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }

  public displayFn(option: string): string {
    console.log('displayFn value------->', option);
    return option;
  }

  public onSubmit() {
    this.updatedForm.value['studentRegNo'] = this.myForm.value['studentRegNo'];
    this.updatedForm.value['courseCode'] = this.myForm.value['courseCode'];
    console.log('updatedForm', this.updatedForm.value);
    this.courseEnroll.addCourseEnroll(this.updatedForm.value).subscribe(
      (obj: any) => {
        this.myFormGroup();
        this.myControl.setValue('');
        this.courseList = [];
        this.filteredList = [];
        console.log('success message', obj.data);
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
}
