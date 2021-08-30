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
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private viewResult: ViewResultService,
    private formBuilder: FormBuilder
  ) { }

  studentList: student[]=[];
  courseList: course[] = [];
  depatmentList: department[]=[];
  selectedStudent: student[]=[];
  selectedCourse: course[] = [];

  myForm = this.formBuilder.group({
    name: new FormControl(''),
    department: new FormControl(''),
    email: new FormControl(''),
    studentRegNo: new FormControl('', Validators.required),
    // courseName: new FormControl('')
  });



  ngOnInit() {
    this.getStudents();
    this.getDepartments();
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  //add course through value object
  getStudents() {
    this.viewResult.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
    });
    console.log(new Date().toLocaleTimeString());
  }
  getDepartments() {
    this.viewResult.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }


  changeFormControl(x: any) {
    this.myForm.controls.courseName.setValue(x);
  }

  changeGradeControl() {
    // this.myForm.controls.grade.setValue(x);
    console.log(this.myForm.value);
  }

  changeId(x: any) {
    this.selectedStudent = x;
    this.myForm.controls.studentRegNo.setValue(x);

    this.viewResult.getCourse(x).subscribe(
      (obj1) => {
        this.getDepartments();
        this.courseList = obj1.data;

        let selectedStdDeptId = this.studentList.find(
          (x:any) =>
            x.registrationNumber === this.selectedStudent
        )?.departmentId;

        let selectedStdName = this.studentList.find(
          (x: any) =>
            x.registrationNumber === this.selectedStudent
        )?.name;
        let selectedStdEmail = this.studentList.find(
          (x: any ) =>
            x.registrationNumber === this.selectedStudent
        )?.email;

        let departmentName = this.depatmentList.find(
          (x:any) => x.id === selectedStdDeptId
        )?.name;

        this.myForm.controls.department.setValue(departmentName);

        this.myForm.controls.name.setValue(selectedStdName);
        this.myForm.controls.email.setValue(selectedStdEmail);
        console.log(this.myForm.value);
      },
      (er1: any) => {
        console.log(er1);
        alert(er1.error.message);
      }
    );
  }

  onSubmit() {

    this.myForm.controls.name.setValue('');
    this.myForm.controls.email.setValue('');
    this.myForm.controls.department.setValue('');
    console.log(this.myForm.value);
    // this.viewResult.addStudentResult(this.myForm.value).subscribe(
    //   (obj: any) => {
    //     console.log(obj.data);

    //     alert(obj.message);
    //     this.myForm.controls.studentRegNo.setValue('');
    //     this.myForm.controls.courseName.setValue('');
    //     this.myForm.controls.gradeLetter.setValue('');
    //   },
    //   (er: any) => {
    //     alert(er.error.message);
    //   }
    // );
  }

}
