import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { course } from '../Models/course';
import { SaveResultService } from '../services/save-result.service';
import { student } from '../Models/student';
import { department } from '../Models/department';
import { studentGrades } from '../Models/studentGrades';
import Swal from 'sweetalert2';
import { serviceResponse } from '../Models/serviceResponse';
import { RepositoryService } from '../services/repository.service';
@Component({
  selector: 'app-save-result',
  templateUrl: './save-result.component.html',
  styleUrls: ['./save-result.component.css'],
})
export class SaveResultComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private saveResult: SaveResultService,
    private repository: RepositoryService,
    private formBuilder: FormBuilder
  ) {}
  public studentList: student[] = [];
  public filteredList: string[] = [];
  public courseList: course[] = [];
  public depatmentList: department[] = [];
  public selectedStudent: string = '';
  public selectedCourse: course[] = [];
  public gradeList: studentGrades[] = [];
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myGrade = new FormControl('');
  public myCourse = new FormControl('');
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(''),
      department: new FormControl(''),
      email: new FormControl(''),
      studentRegNo: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
      gradeLetter: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getStudents();
    this.getDepartments();
    // this.getGrades();
    this.myFormGroup();
  }

  public get myFormControl() {
    return this.myForm.controls;
  }

  //add course through value object
  public getStudents() {
    this.repository.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
    });
  }
  public getDepartments() {
    this.repository.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }

  public changeGrade() {
    this.myForm.controls['gradeLetter'].setValue(this.myGrade.value.grade);
  }
  displayGrade(option: studentGrades): string {
    return option.grade;
  }

  public filterGrade(e: string) {
    this.gradeList = [];
    this.repository.getGrade(e).subscribe(
      (data: serviceResponse) => {
        this.gradeList = data.data;
      },
      (er: serviceResponse) => {
        this.gradeList = [];
      }
    );
  }
  public gradeKey: number = 0;
  public gradeDDL(e: any) {
    if (e.timeStamp - this.gradeKey > 1500) {
      this.filterGrade(e.target.value);
      this.gradeKey = e.timeStamp;
    }
  }

  public changeCourseName() {
    this.myForm.controls['courseName'].setValue(this.myCourse.value.name);
  }
  displayCourse(option: course): string {
    return option.name;
  }

  public filterCourse(e: string) {
    this.repository.getEnrolledCourseByStd(this.myControl.value, e).subscribe(
      (data: serviceResponse) => {
        this.courseList = [];
        for (let index = 0; index < data.data.length; index++) {
          if (data.data[index]) {
            this.courseList.push(data.data[index]);
          }
        }
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
  public changeFormControl(x: any) {
    this.myForm.controls.courseName.setValue(x);
  }
  public filterDropdown(e: string) {
    // this.selectedStudent = this.myControl.value;
    this.myFormGroup();
    // this.myForm.controls['studentRegNo'].setValue(this.selectedStudent);
    this.courseList = [];
    this.myCourse = new FormControl('');
    this.gradeList = [];
    this.myGrade = new FormControl('');

    this.repository.getStdDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = [];
        this.filteredList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public changeGradeControl() {}

  public changeView() {
    let selectedStdDeptId = this.studentList.find(
      (x: any) => x.registrationNumber === this.selectedStudent
    )?.departmentId;

    let selectedStdName = this.studentList.find(
      (x: any) => x.registrationNumber === this.selectedStudent
    )?.name;
    let selectedStdEmail = this.studentList.find(
      (x: any) => x.registrationNumber === this.selectedStudent
    )?.email;

    let departmentName = this.depatmentList.find(
      (x: any) => x.id === selectedStdDeptId
    )?.name;

    this.myForm.controls.department.setValue(departmentName);

    this.myForm.controls.name.setValue(selectedStdName);
    this.myForm.controls.email.setValue(selectedStdEmail);
  }
  public changeId() {
    this.selectedStudent = this.myControl.value;
    this.myFormGroup();
    this.myForm.controls['studentRegNo'].setValue(this.selectedStudent);
    this.myCourse = new FormControl('');
    this.myGrade = new FormControl('');
  }
  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
    }
  }

  public displayFn(option: string): string {
    return option;
  }
  public onSubmit() {
    this.saveResult.addStudentResult(this.myForm.value).subscribe(
      (obj: any) => {
        this.myFormGroup();
        this.courseList = [];
        this.myControl = new FormControl('');
        this.myCourse = new FormControl('');
        this.myGrade = new FormControl('');
        this.filteredList = [];
        this.gradeList = [];
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
}
