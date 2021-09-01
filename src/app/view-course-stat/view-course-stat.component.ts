import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewCourseService } from '../services/view-course.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-view-course-stat',
  templateUrl: './view-course-stat.component.html',
  styleUrls: ['./view-course-stat.component.css'],
})
export class ViewCourseStatComponent implements OnInit, OnDestroy {
  selectedItem: any;
  departmentList: any;
  courseList: any;
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
    this.viewCourseService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;

    });
  }


  print() {
    console.log(this.selectedItem);
    this.courseList = [];
    this.viewCourseService.getCourse(this.selectedItem).subscribe(
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
