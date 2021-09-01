import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { course } from '../Models/course';
import { student } from '../Models/student';
import { department } from '../Models/department';
import { ViewResultService } from '../services/view-result.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private viewResult: ViewResultService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getStudents();
  }

  studentList: student[] = [];
  courseList: course[] = [];
  depatmentList: department[] = [];
  selectedStudent: student[] = [];
  selectedCourse: course[] = [];
  enrolledCourseList: any;

  name = new FormControl('');
  department = new FormControl('');
  email = new FormControl('');
  studentRegNo = new FormControl('', Validators.required);

  //add course through value object
  getStudents() {
    this.viewResult.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
    });
  }
  getDepartments() {
    this.viewResult.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }

  // changeFormControl(x: any) {
  //   this.myForm.controls.courseName.setValue(x);
  // }

  // changeGradeControl() {
  //   // this.myForm.controls.grade.setValue(x);
  //   console.log(this.myForm.value);
  // }

  changeId(x: any) {
    this.selectedStudent = x;
    this.studentRegNo.setValue(x);
    // console.log(x);

    this.viewResult.getCourse(x).subscribe(
      (obj1) => {
        this.getDepartments();
        this.courseList = obj1.data;
        // if(this.courseList.indexOf() !== -1) {
        //   $scope.message = 'artNr already exists!';
        // }

        let selectedStdDeptId = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.departmentId;

        let selectedStdName = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.name;
        let selectedStdEmail = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.email;

        let departmentName = this.depatmentList.find(
          (x: any) => x.id == selectedStdDeptId
        )?.name;

        // console.log(selectedStdDeptId, selectedStdName,
        //   selectedStdEmail,departmentName);
        this.department.setValue(departmentName);

        this.name.setValue(selectedStdName);
        this.email.setValue(selectedStdEmail);
        // console.log(this.name.value,this.email.value,this.department.value);
        console.log(this.courseList);
      },
      (er1: any) => {
        console.log(er1);
        alert(er1.error.message);
      }
    );
  }
}
