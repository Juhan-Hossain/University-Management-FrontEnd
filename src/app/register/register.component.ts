import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {}

  myForm = this.formBuilder.group({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  });

  ngOnInit(): void {}

  get registerFormControl() {
    return this.myForm.controls;
  }

  register() {
    // console.log("formValue", this.myForm.value);
    this.myForm.controls.confirmPassword.setValue('');
    console.log("formValue", this.myForm.value);
    this.registerService.registerUser(this.myForm.value).subscribe(
      (data: any) => {
        Swal.fire("success");
      },
      (error: any) => {
        Swal.fire(error);
      }
    );
  }
}
