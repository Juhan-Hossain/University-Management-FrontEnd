import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseEnrollService } from '../services/course-enroll.service';
import { course } from '../Models/course';
import Swal from 'sweetalert2';

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
  studentList: any;
  courseList: course[] = [];
  depatmentList: any;
  selectedStudent: any;
  selectedCourse: course[] = [];
  // selectedStdDeptId: any;
  myForm = this.formBuilder.group({
    name: new FormControl(''),
    department: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl('', Validators.required),
    studentRegNo: new FormControl('', Validators.required),
    courseCode: new FormControl('', Validators.required),
  });
  updatedForm = this.formBuilder.group({
    studentRegNo: new FormControl('', Validators.required),
    courseCode: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getStudents();
    this.getDepartments();
  }

  //get helper method manipulation
  get myFormControl() {
    return this.myForm.controls;
  }

  // cahnge departmentId by selection
  changeId(x: any) {
    this.selectedStudent = x;
    this.myForm.controls.studentRegNo.setValue(x);
    this.courseEnroll.getCourse(x).subscribe(
      (obj1) => {
        this.getDepartments();
        this.courseList = obj1.data;

        let selectedStdDeptId = this.studentList.find(
          (x: { registrationNumber: any }) =>
            x.registrationNumber === this.selectedStudent
        ).departmentId;

        let selectedStdName = this.studentList.find(
          (x: { registrationNumber: any }) =>
            x.registrationNumber === this.selectedStudent
        ).name;
        let selectedStdEmail = this.studentList.find(
          (x: { registrationNumber: any }) =>
            x.registrationNumber === this.selectedStudent
        ).email;

        let departmentName = this.depatmentList.find(
          (x: { id: any }) => x.id === selectedStdDeptId
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
  changeFormControl(x: any) {
    this.myForm.controls.courseId.setValue(x);
  }

  //add course through value object
  getStudents() {
    this.courseEnroll.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
    });
    console.log(new Date().toLocaleTimeString());
  }
  getDepartments() {
    this.courseEnroll.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }

  onSubmit() {
    this.updatedForm.value['studentRegNo'] = this.myForm.value['studentRegNo'];
    this.updatedForm.value['courseCode'] = this.myForm.value['courseCode'];
    console.log('updatedForm', this.updatedForm.value);
    this.courseEnroll.addCourseEnroll(this.updatedForm.value).subscribe(
      (obj: any) => {
        this.myForm.controls['courseCode'].setValue('');
        this.myForm.controls['studentRegNo'].setValue('');
        this.myForm.controls['date'].setValue('');
        this.myForm.controls['email'].setValue('');
        this.myForm.controls['department'].setValue('');
        this.myForm.controls['name'].setValue('');
        console.log('success message', obj.data);
        // this.ngOnInit();
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
}
