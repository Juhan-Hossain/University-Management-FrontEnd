import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from '../services/course.service';
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

  departmentList: any;
  semesterList: any;
  isValidFormSubmitted = null;
  errors: any;
  myForm = this.formBuilder.group({
    name : new FormControl('', Validators.required),
    code: new FormControl('', [Validators.required, Validators.minLength(5)]),
    credit: new FormControl('', [Validators.required, Validators.max(5), Validators.min(.5)]),
    description: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    semesterId: new FormControl('', Validators.required)

  });

  ngOnInit() {
    this.getDepartment();
    this.getSemester();
  }

  //get helper method manipulation
  get registerFormControl() {
    return this.myForm.controls;
  }

 // cahnge departmentId by selection
 changeDeptId(e:any) {
    console.log(e);
    console.log(this.myForm.value);
    this.myForm.controls['departmentId'].setValue(e, {
      onlySelf: true
    });
 }

   // cahnge semesterId by selection
 changeSemesterId(e:any) {
  console.log(e);
  console.log(this.myForm.value);
  this.myForm.controls['semesterId'].setValue(e, {
    onlySelf: true
  });
}



  //add course through value object
  addCourse() {
    this.courseService.saveCourse(this.myForm.value).subscribe(
      (data: any) => {
        console.log(data.message);
      },
      (error: any) => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }

  getDepartment() {
    this.courseService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }

  getSemester() {
    this.courseService.getSemester().subscribe((data: any) => {
      this.semesterList = data.data;
      console.log(data.message);
    });
  }
}
