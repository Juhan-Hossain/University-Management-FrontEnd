import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
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
export class ViewCourseStatComponent implements OnInit, OnDestroy{
  selectedItem: any;
  departmentList: any;
  courseList: any;
  departmentId = new FormControl();

  //injecting
  constructor(
    private http: HttpClient,
    private viewCourseService: ViewCourseService,
    private formBuilder: FormBuilder
  ) {}



  ngOnInit() {
    //calling it inside ngOnInit to load on the start
    this.getDepartment();

  }

 //getting data from service & apply subscription
  //for service response<data,message,success>,load dada to department list
  getDepartment() {
    this.viewCourseService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      // console.log(data.data);
    });
  }

  //using print() to pass selectedItem to service for query param
  print() {
    console.log(this.selectedItem);
    this.viewCourseService.getCourse(this.selectedItem).subscribe(x => {
      this.courseList = x.data;
    })
  }
  ngOnDestroy() {

  }



}
