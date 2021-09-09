import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewCourseService } from '../services/view-course.service';
import Swal from 'sweetalert2';
import { serviceResponse } from '../Models/serviceResponse';
import { department } from '../Models/department';
import { course } from '../Models/course';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-view-course-stat',
  templateUrl: './view-course-stat.component.html',
  styleUrls: ['./view-course-stat.component.css'],
})
export class ViewCourseStatComponent implements OnInit, OnDestroy {
  departmentList: department[]=[];
  courseList: course[]=[];
  departmentId = new FormControl();

  constructor(
    private http: HttpClient,
    private viewCourseService: ViewCourseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.getDepartment();
  }


  getDepartment() {
    this.viewCourseService.getDepartment().subscribe((data: serviceResponse) => {
      this.departmentList = data.data;

    });
  }


  print() {
    this.courseList = [];
    this.viewCourseService.getCourse(this.departmentId.value).subscribe(
      (x) => {
        this.courseList = x.data;
      },
      (er) => {
        Swal.fire(er.error.message);
      }
    );
  }
  ngOnDestroy() {}
}
