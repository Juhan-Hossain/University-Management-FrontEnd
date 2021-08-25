import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { saveDepartmentService } from './save-departmentService.service';
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
  updateMode = false;
  errors: any;
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getDepartment();
  }


  constructor(
    private http: HttpClient,
    private departmentService: saveDepartmentService
  ) {}

  addDepartment() {
    this.departmentService.saveDepartment(this.myForm.value).subscribe(
      (data: any) => {
        this.getDepartment();
        console.log(data.message);
      },
      (error: any) => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
      // console.log(Error.error.message);
    });
  }
}
