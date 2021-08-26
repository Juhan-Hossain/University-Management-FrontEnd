import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewCourseService } from '../services/view-course.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-view-course-stat',
  templateUrl: './view-course-stat.component.html',
  styleUrls: ['./view-course-stat.component.css'],
})
export class ViewCourseStatComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private viewCourseService: ViewCourseService,
    private formBuilder: FormBuilder
  ) {}

  departmentList: any;
  courseList: any;
  departmentId = new FormControl();

  ngOnInit() {
    this.getDepartment();
    this.departmentId.valueChanges.subscribe(x => {

      this.viewCourseService.getCourse(x).subscribe((data: any) => {
        this.courseList = data.data;
        console.log(data.data);
      });
    })
  }

  getDepartment() {
    this.viewCourseService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      console.log(data.data);
    });
  }


}
