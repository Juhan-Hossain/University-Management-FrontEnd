import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { course } from '../Models/course';
import { student } from '../Models/student';
import { department } from '../Models/department';
import { ViewResultService } from '../services/view-result.service';
import { viewResult } from '../Models/viewResult';
import { studentResult } from '../Models/studentResult';
import Swal from 'sweetalert2';

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
    this.getStudents();
  }

  studentList: student[] = [];
  courseList: course[] = [];
  depatmentList: department[] = [];
  selectedStudent: student[] = [];
  selectedCourse: course[] = [];
  enrolledCourseList: any;
  resultView: viewResult[]=[];

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



  changeId(x: any) {
    this.selectedStudent = x;
    this.studentRegNo.setValue(x);
    // console.log(x);

    this.viewResult.getEnrolledCourse(x).subscribe(
      (obj1) => {
        this.getDepartments();

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

        this.department.setValue(departmentName);

        this.name.setValue(selectedStdName);
        this.email.setValue(selectedStdEmail);


        this.courseList = obj1.data;
        if (this.courseList.length === 0)
        {
          Swal.fire("This student doesn't enrolled any course yet! ");
          }
        this.resultView = [];
        for (let i = 0; i < this.courseList.length; i++)
        {
          let value: viewResult= new viewResult('','','') ;
           value.courseName = this.courseList[i].name;

          value.courseCode = this.courseList[i].code;
          let p = this.courseList[i].courseEnrolls;

          for (let j = 0; j < p.length; j++)
          {
            if (p[j].studentRegNo === this.selectedStudent)
            {
              if (p[j].grade !== null)
              {
                value.gradeLetter = p[j].grade;
              }
              else
              {
                value.gradeLetter = "not graded yet!";
              }

            }
          }
          this.resultView.push(value);
        }
      },
      (er1: any) => {
        console.log(er1);
        Swal.fire(er1.error.message);
      }
    );
  }
}
