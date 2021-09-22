import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
import { department } from '../Models/department';
import { serviceResponse } from '../Models/serviceResponse';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-save-teacher',
  templateUrl: './save-teacher.component.html',
  styleUrls: ['./save-teacher.component.css'],
})
export class SaveTeacherComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder
  ) {}

  public departmentList: department[] = [];
  public filteredList: department[] = [];
  public designationList: any;
  public isValidFormSubmitted = null;
  public errors: any;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myDesignation = new FormControl('');
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      creditToBeTaken: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
      ]),
    });
  }

  ngOnInit() {
    this.myFormGroup();
  }

  //get helper method manipulation
  public get registerFormControl() {
    return this.myForm.controls;
  }

  // //get helper method manipulation
  // public get myFormControl() {
  //   return this.myControl.get;
  // }
  // cahnge semesterId by selection
  public changeDesignationId() {
    this.myForm.controls['designationId'].setValue(this.myDesignation.value.id);
  }
  public designationDisplayFn(option: department): string {
    return option.name;
  }

  public designationFilter(e: string) {
    this.designationList = [];
    this.teacherService.getDesignation(e).subscribe(
      (data: serviceResponse) => {
        this.designationList = data.data;
      },
      (er: serviceResponse) => {
        this.designationList = [];
      }
    );
  }
  public lastKey: number = 0;
  public designationDDL(e: any) {
    if (e.timeStamp - this.lastKey > 1500) {
      this.designationFilter(e.target.value);
      this.lastKey = e.timeStamp;
    }
  }

  //add course through value object
  public addTeacher() {
    this.teacherService.saveTeacher(this.myForm.value).subscribe(
      (data: any) => {
        this.myFormGroup();
        this.filteredList = [];
        this.designationList = [];
        this.myControl = new FormControl('');
        this.myDesignation = new FormControl('');
        Swal.fire(data.message);
      },
      (error: any) => {
        Swal.fire(error.error.message);
      }
    );
  }
  // public getDesignation() {
  //   this.teacherService.getDesignation().subscribe((data: any) => {
  //     this.designationList = data.data;
  //   });
  // }
  // cahnge departmentId by selection
  public changeDeptId() {
    this.myForm.controls['departmentId'].setValue(this.myControl.value.id);
  }
  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.filteredList = [];
    console.log('e in filterDropdown -------> ', e);
    this.teacherService.getDeptDDL(e).subscribe(
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
}
