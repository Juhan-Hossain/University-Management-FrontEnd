import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterStudentService } from '../services/register-student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class RegisterStudentComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private registerStudent: RegisterStudentService,
    private formBuilder: FormBuilder
  ) {}

  departmentList: any;
  semesterList: any;

  myForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getDepartment();
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

  //add course through value object
  addStudent() {
    this.registerStudent.saveStudent(this.myForm.value).subscribe(
      (obj: any) => {
        console.log(obj.data);
        console.log(this.myForm.value);
        Swal.fire(obj.message);
      },
      (error: any) => {
        console.log(error);
        Swal.fire(error.error.message);
      }
    );
  }

  getDepartment() {
    this.registerStudent.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }
}
