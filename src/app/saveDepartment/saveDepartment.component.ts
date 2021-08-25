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
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getDepartment();
  }

  constructor(
    private http:HttpClient,private DepartmentService:saveDepartmentService
  ) {}

  addDepartment() {
    this.DepartmentService.saveDepartment(this.myForm.value).subscribe(
      (data :any) => {
        this.getDepartment();
      }
    );
  }

  getDepartment() {
    this.DepartmentService.getDepartment().subscribe((data:any) => {
      this.departmentList = data.data;
    });
  }
}
