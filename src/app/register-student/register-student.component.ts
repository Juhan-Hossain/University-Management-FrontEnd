import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterStudentService } from '../services/register-student.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  departmentList: any;
  semesterList: any;
  closeModal: string | undefined;
  myForm: FormGroup = new FormGroup({});
  myFormGroup() {
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
        this.myFormGroup();
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

  // triggerModal(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
  //     this.closeModal = `Closed with: ${res}`;
  //   }, (res) => {
  //     this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  getDepartment() {
    this.registerStudent.getDepartment().subscribe((data: any) => {
      this.departmentList = data.data;
    });
  }
}
