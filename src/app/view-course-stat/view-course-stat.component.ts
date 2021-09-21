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
  public departmentList: department[] = [];
  public filteredList: department[] = [];
  public courseList: course[] = [];
  public departmentId = new FormControl();
  public myControl = new FormControl('');

  constructor(
    private http: HttpClient,
    private viewCourseService: ViewCourseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getDepartment();
  }

  public getDepartment() {
    this.viewCourseService
      .getDepartment()
      .subscribe((data: serviceResponse) => {
        this.departmentList = data.data;
      });
  }
  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.filteredList = [];
    this.courseList = [];
    console.log('e in filterDropdown -------> ', e);
    this.viewCourseService.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
        console.log('####filteredList####', this.filteredList);
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }
  public print() {
    this.courseList = [];
    this.viewCourseService.getCourse(this.myControl.value.id).subscribe(
      (x) => {
        this.courseList = x.data;
      },
      (er) => {
        Swal.fire(er.error.message);
      }
    );
  }
  public ngOnDestroy() {}
}
