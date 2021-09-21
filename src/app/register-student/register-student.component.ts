import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterStudentService } from '../services/register-student.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { department } from '../Models/department';
import { serviceResponse } from '../Models/serviceResponse';

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
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  public departmentList: department[] = [];
  public filteredList: department[] = [];
  public semesterList: any;
  public closeModal: string | undefined;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getDepartment();
    this.myFormGroup();
  }

  //get helper method manipulation
  public get registerFormControl() {
    return this.myForm.controls;
  }

  // cahnge departmentId by selection
  public changeDeptId() {
    this.myForm.controls['departmentId'].setValue(this.myControl.value.id);
  }

  //add course through value object
  public addStudent() {
    this.registerStudent.saveStudent(this.myForm.value).subscribe(
      (obj: any) => {
        this.myFormGroup();
        this.myControl.setValue('');
        console.log('student Data', obj.data);
        Swal.fire(
          `RegNo: ${obj.data.registrationNumber}`,
          `name: ${obj.data.name},
          address: ${obj.data.address},
          contact: ${obj.data.contactNumber}`
        );
      },
      (error: any) => {
        console.log(error);
        Swal.fire(error.error.message);
      }
    );
  }
  public getDepartment() {
    this.registerStudent.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }

  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.filteredList = [];
    console.log('e in filterDropdown -------> ', e);
    this.registerStudent.getDeptDDL(e).subscribe(
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
