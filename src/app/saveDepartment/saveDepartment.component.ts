import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { saveDepartmentService } from './save-departmentService.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-saveDepartment',
  templateUrl: './saveDepartment.component.html',
  styleUrls: ['./saveDepartment.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class SaveDepartmentComponent implements OnInit {
  url = 'https://localhost:44322/api/Departments/';
  departmentList: any;
  isValidFormSubmitted = null;
  errors: any;
  myForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(7),
    ]),
  });

  ngOnInit() {
    this.getDepartment();
  }
  constructor(
    private http: HttpClient,
    private departmentService: saveDepartmentService,
    private formBuilder: FormBuilder
  ) {}

  get registerFormControl() {
    return this.myForm.controls;
  }
  get code() {
    return this.myForm.get('code');
  }
  addDepartment() {
    this.departmentService.saveDepartment(this.myForm.value).subscribe(
      (data: any) => {
        this.myForm.controls.name.setValue(''); // '';
        this.myForm.controls.code.setValue('');

        this.getDepartment();
        console.log(data.data);
        Swal.fire(data.message);
      },
      (error: any) => {
        console.log(error);

        Swal.fire(error.error.message);
      }
    );
  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }
}
