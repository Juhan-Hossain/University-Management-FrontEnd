import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
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

  departmentList: any;
  designationList: any;
  isValidFormSubmitted = null;
  errors: any;
  myForm: FormGroup = new FormGroup({});
  myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      designationId: new FormControl('', Validators.required),
      creditToBeTaken: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
      ]),
    });
  }

  ngOnInit() {
    this.getDepartment();
    this.getDesignation();
    this.myFormGroup();
  }

  //get helper method manipulation
  get registerFormControl() {
    return this.myForm.controls;
  }

  // cahnge departmentId by selection
  changeDeptId(e: any) {
    console.log(e);
    console.log(this.myForm.value);
    this.myForm.controls['departmentId'].setValue(e, {
      onlySelf: true,
    });
  }

  // cahnge semesterId by selection
  changeDesignationId(e: any) {
    console.log(e);
    console.log(this.myForm.value);
    this.myForm.controls['designationId'].setValue(e, {
      onlySelf: true,
    });
  }

  //add course through value object
  addTeacher() {
    this.teacherService.saveTeacher(this.myForm.value).subscribe(
      (data: any) => {
        this.myFormGroup();

        console.log('data message', data.message);
        // this.getDepartment();
        // this.getDesignation();
        this.departmentList = [];
        this.designationList = [];
        Swal.fire(data.message);
      },
      (error: any) => {
        console.log(error);
        Swal.fire(error.error.message);
      }
    );
  }

  getDepartment() {
    this.teacherService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      console.log(data.data);
    });
  }

  getDesignation() {
    this.teacherService.getDesignation().subscribe((data: any) => {
      this.designationList = data.data;
      console.log(data.message);
      console.log(data.data);
    });
  }
}
