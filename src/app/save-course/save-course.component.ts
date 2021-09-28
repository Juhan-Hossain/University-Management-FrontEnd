import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from '../services/course.service';
import Swal from 'sweetalert2';
import { department } from '../Models/department';
import { serviceResponse } from '../Models/serviceResponse';
import { RepositoryService } from '../services/repository.service';
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
    private repository: RepositoryService,
    private formBuilder: FormBuilder
  ) {}

  public filteredList: department[] = [];
  public filteredSemList: any;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public mySemControl = new FormControl('');
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.minLength(5)]),
      credit: new FormControl('', [
        Validators.required,
        Validators.max(5),
        Validators.min(0.5),
      ]),
      description: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      semesterId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.myFormGroup();
  }

  //get helper method manipulation
  public get registerFormControl() {
    return this.myForm.controls;
  }
  // cahnge semesterId by selection
  public changeSemesterId() {
    this.myForm.controls['semesterId'].setValue(this.mySemControl.value.id);
  }
  public displayFn2(option: any): string {
    return option.name;
  }

  public filterSemDropdown(e: string) {
    this.filteredSemList = [];
    this.repository.getSemester(e).subscribe(
      (data: serviceResponse) => {
        this.filteredSemList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredSemList = [];
      }
    );
  }
  public lastKeyPress1: number = 0;
  public debounceTime2(e: any) {
    if (e.timeStamp - this.lastKeyPress1 > 1500) {
      this.filterSemDropdown(e.target.value);
      this.lastKeyPress1 = e.timeStamp;
    }
  }

  //add course through value object
  public addCourse() {
    this.courseService.saveCourse(this.myForm.value).subscribe(
      (data: any) => {
        this.myFormGroup();
        this.myControl = new FormControl('');
        this.filteredList = [];
        this.mySemControl = new FormControl('');
        this.filteredSemList = [];
        Swal.fire(data.message);
      },
      (error: any) => {
        Swal.fire(error.error.message);
      }
    );
  }

  // cahnge departmentId by selection
  public changeDeptId() {
    this.myForm.controls['departmentId'].setValue(this.myControl.value.id);
  }
  public displayFn(option: department): string {
    return option.name;
  }

  public filterDeptDropdown(e: string) {
    this.filteredList = [];
    this.repository.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDeptDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
    }
  }
}
