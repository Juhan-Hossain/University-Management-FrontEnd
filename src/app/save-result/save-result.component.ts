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
@Component({
  selector: 'app-save-result',
  templateUrl: './save-result.component.html',
  styleUrls: ['./save-result.component.css'],
})
export class SaveResultComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private saveResult: SaveResultService,
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
    this.saveResult.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
    });
  }
  public getDepartments() {
    this.saveResult.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }
  public getGrades() {
    this.saveResult.getGrade().subscribe((data: any) => {
      this.gradeList = data.data;
      this.gradeList = this.gradeList.sort((a, b) =>
        a.value > b.value ? 1 : -1
      );
    });
  }

  public changeFormControl(x: any) {
    this.myForm.controls.courseName.setValue(x);
  }
  public filterDropdown(e: string) {
    this.myFormGroup();
    this.courseList = [];
    this.gradeList = [];
    console.log('e in filterDropdown -------> ', e);
    let searchString = '';
    searchString = e.toLowerCase();
    this.saveResult.getStdDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public changeGradeControl() {}

  public changeId() {
    this.selectedStudent = this.myControl.value;
    this.myForm.controls['studentRegNo'].setValue(this.selectedStudent);
    this.myForm.controls['courseName'].setValue('');
    this.courseList = [];

    this.saveResult.getCourse(this.selectedStudent).subscribe(
      (obj1) => {
        this.courseList = obj1.data;
        if (this.courseList.length == 0) {
          Swal.fire("this student don't have any enrolled course!!!");
          return;
        }
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
      },
      (er1: any) => {
        alert(er1.error.message);
      }
    );
    this.getGrades();
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
  onSubmit() {
    this.saveResult.addStudentResult(this.myForm.value).subscribe(
      (obj: any) => {
        this.myFormGroup();
        this.courseList = [];
        this.myControl.setValue('');
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
