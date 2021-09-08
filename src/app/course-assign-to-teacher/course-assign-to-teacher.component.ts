import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { course } from '../Models/course';
import { student } from '../Models/student';
import { department } from '../Models/department';
import { CourseAssignService } from '../services/course-assign.service';
import Swal from 'sweetalert2';

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
    this.myForm.controls.courseName.setValue('');
    this.myForm.controls.creditToBeTaken.setValue('');
    this.myForm.controls.remainingCredit.setValue('');
    this.myForm.controls.courseCredit.setValue('');

    console.log(this.myForm.value);
    this.courseAssign.addCourseAssign(this.myForm.value).subscribe(
      (obj: any) => {
        console.log(obj.data);

        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
  changeDeptId(x: any) {
    this.courseAssign.getTeacher(x).subscribe(
      (obj1) => {
        this.teacherList = obj1.data;
        this.selectedTeacher = this.myForm.controls.teacherId.value;
      },
      (er1: any) => {
        console.log(er1);
        Swal.fire(er1.error.message);
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
        Swal.fire(erMain.error.message);
      }
    );
  }

  changeTeacher() {
    let y = this.myForm.controls.teacherId.value;

    this.selectedTeacher = this.myForm.controls.teacherId.value;
    let selectedCreditToTaken = this.teacherList.find(
      (px: any) => px.id == this.myForm.controls.teacherId.value
    )?.creditToBeTaken;
    let selectedRemainingCredit = this.teacherList.find(
      (px: any) => px.id == this.myForm.controls.teacherId.value
    )?.remainingCredit;
    console.log(this.myForm.controls.teacherId.value);

    this.myForm.controls.creditToBeTaken.setValue(selectedCreditToTaken);

    this.myForm.controls.remainingCredit.setValue(selectedRemainingCredit);

    console.log(this.myForm.value);
  }
  changeCourseControl(x: string) {
    // this.getDepartments();
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
