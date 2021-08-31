import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { course } from '../Models/course';
import { student } from '../Models/student';
import { department } from '../Models/department';
import { CourseAssignService } from '../services/course-assign.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-course-assign-to-teacher',
  templateUrl: './course-assign-to-teacher.component.html',
  styleUrls: ['./course-assign-to-teacher.component.css'],
})
export class CourseAssignTOTeacherComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private courseAssign: CourseAssignService,
    private formBuilder: FormBuilder
  ) {}

  studentList: student[] = [];
  courseList: course[] = [];
  depatmentList: department[] = [];
  teacherList: any;
  selectedDepartment: any;
  selectedCourse: course[] = [];
  selectedTeacher: any;
  selectedCode: any;

  myForm = this.formBuilder.group({
    courseName: new FormControl(),

    departmentId: new FormControl('', Validators.required),
    teacherId: new FormControl('', Validators.required),
    creditToBeTaken: new FormControl(),
    remainingCredit: new FormControl(),
    code: new FormControl('', Validators.required),
    courseCredit: new FormControl(),
  });
  ngOnInit(): void {
    this.getDepartments();
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  getDepartments() {
    this.courseAssign.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
      // this.selectedDepartment = this.myForm.controls
      //   .department.value;
    });
  }

  onSubmit() {
    // this.myForm.controls.courseName.setValue('');
    // this.myForm.controls.creditToBeTaken.setValue('');
    // this.myForm.controls.remainingCredit.setValue('');
    // this.myForm.controls.courseCredit.setValue('');

    console.log(this.myForm.value);
    this.courseAssign.addCourseAssign(this.myForm.value).subscribe(
      (obj: any) => {
        console.log(obj.data);

        alert(obj.message);

      },
      (er: any) => {
        alert(er.error.message);
      }
    );
  }
  changeDeptId(x: any) {
    this.courseAssign.getTeacher(x).subscribe(
      (obj1) => {
        // this.getDepartments();
        this.teacherList = obj1.data;
        this.selectedTeacher = this.myForm.controls.teacherId.value;
        let selectedCreditToTaken = this.teacherList.find(
          (px: any) => px.id == this.selectedTeacher
        )?.creditToBeTaken;
        this.myForm.controls.creditToBeTaken.setValue(selectedCreditToTaken);
        let selectedRemainingCredit = this.teacherList.find(
          (px: any) => px.id == this.selectedTeacher
        )?.remainingCredit;

        console.log(selectedCreditToTaken);


        this.myForm.controls.remainingCredit.setValue(selectedRemainingCredit);
      },
      (er1: any) => {
        console.log(er1);
        alert(er1.error.message);
      }
    );

    //---------------------------------
    this.courseAssign.getCourse(x).subscribe(
      (obj1) => {
        this.courseList = obj1.data;
        this.selectedCode = this.myForm.controls.code.value;
        let selectedcourseName = this.courseList.find(
          (px: any) => px.code == this.selectedCode
        )?.name;
        let selectedCourseCredit = this.courseList.find(
          (x: any) => x.code == this.selectedCode
        )?.credit;

        this.myForm.controls.courseName.setValue(selectedcourseName);

        this.myForm.controls.courseCredit.setValue(selectedCourseCredit);
      },
      (erMain: any) => {
        console.log(erMain);
        alert(erMain.error.message);
      }
    );
  }

  changeTeacher() {
    this.getDepartments();
    this.changeDeptId(this.myForm.controls.departmentId.value);
    let y = this.myForm.controls.teacherId.value;

    this.selectedTeacher = y;

    this.selectedTeacher = this.myForm.controls.teacherId.value;
    let selectedCreditToTaken = this.teacherList.find(
      (px: any) => px.id === y
    )?.creditToBeTaken;
    let selectedRemainingCredit = this.teacherList.find(
      (px: any) => px.id === y
    )?.remainingCredit;


    this.myForm.controls.courseName.setValue(selectedCreditToTaken);

    this.myForm.controls.remainingCredit.setValue(selectedRemainingCredit);

  }
  changeCourseControl(x: string) {
    this.getDepartments();
    this.selectedCode = this.myForm.controls.code.value;

    let selectedcourseName = this.courseList.find(
      (px: any) => px.code == this.selectedCode
    )?.name;
    let selectedCourseCredit = this.courseList.find(
      (x: any) => x.code == this.selectedCode
    )?.credit;

    this.myForm.controls.courseName.setValue(selectedcourseName);

    this.myForm.controls.courseCredit.setValue(selectedCourseCredit);
  }
}
