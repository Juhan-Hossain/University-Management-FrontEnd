import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  updateMode = false;
  myForm = new FormGroup({
    name: new FormControl(''),
    code: new FormControl('')
  });



  constructor(private http:HttpClient) {

  }
  ngOnInit(): void {
  }

  addDepartment()
  {
    this.http.post(`${this.url}CreateDepartment`, this.myForm.value).subscribe(data => {
      console.log(data);
    });
  }


}

