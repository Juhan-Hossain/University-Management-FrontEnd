import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { course } from '../Models/course';
import { student } from '../Models/student';
import { department } from '../Models/department';

import Swal from 'sweetalert2';

import { serviceResponse } from '../Models/serviceResponse';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseAssignService } from '../services/course-assign.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-course-assign-to-teacher',
  templateUrl: './course-assign-to-teacher.component.html',
  styleUrls: ['./course-assign-to-teacher.component.css'],
})
export class CourseAssignTOTeacherComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private courseAssign: CourseAssignService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  studentList: student[] = [];
  courseList: course[] = [];
  depatmentList: department[] = [];
  filteredList: department[] = [];
  teacherList: any;
  selectedDepartment: any;
  selectedCourse: course[] = [];
  selectedTeacher: any;
  selectedCode: any;
  closeModal: string | undefined;
  myForm: FormGroup = new FormGroup({});
  myFormGroup() {
    this.myForm = this.formBuilder.group({
      courseName: new FormControl(),

      departmentId: new FormControl('', Validators.required),
      teacherId: new FormControl('', Validators.required),
      creditToBeTaken: new FormControl(),
      remainingCredit: new FormControl(),
      code: new FormControl('', Validators.required),
      courseCredit: new FormControl(),
    });
  }

  updatedForm = this.formBuilder.group({
    departmentId: new FormControl('', Validators.required),
    teacherId: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getDepartments();
    this.myFormGroup();
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  getDepartments() {
    this.courseAssign.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
      this.filteredList = data.data;
    });
  }

  filterDropdown(e: any) {
    this.myFormGroup();
    console.log('e in filterDropdown -------> ', e.target.value);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.target.value.toLowerCase();
    if (!searchString) {
      this.filteredList = this.depatmentList.slice();
      return;
    } else {
      this.filteredList = this.depatmentList.filter(
        (dept) => dept.name.toLowerCase().indexOf(searchString) > -1
      );
    }
    window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log('this.filteredList indropdown -------> ', this.filteredList);
  }
  addCourse() {
    this.courseAssign.addCourseAssign(this.updatedForm.value).subscribe(
      (obj: any) => {
        this.studentList = [];
        this.teacherList = [];
        this.courseList = [];
        this.depatmentList = [];
        console.log(obj.data);
        this.myFormGroup();
        Swal.fire(obj.message);
      },
      (er: any) => {
        Swal.fire(er.error.message);
      }
    );
  }
  onConfirm() {
    this.updatedForm.value['code'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myForm.value['departmentId'];
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
  }
  onSubmit() {
    this.updatedForm.value['code'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myForm.value['departmentId'];
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
    console.log(this.updatedForm.value);
  }
  changeDeptId(x: any) {
    this.courseAssign.getTeacher(x).subscribe(
      (obj1) => {
        this.teacherList = obj1.data;
        this.selectedTeacher = this.myForm.controls.teacherId.value;
      },
      (er1: any) => {
        console.log(er1);
        Swal.fire(er1.error.message);
      }
    );
    //---------------------------------
    this.courseAssign.getCourse(x).subscribe(
      (obj1) => {
        this.courseList = obj1.data;
        this.selectedCode = this.myForm.controls.code.value;
        let selectedcourseName = this.courseList.find(
          (px: any) => px.code == this.selectedCode
        )?.name;
        let selectedCourseCredit = this.courseList.find(
          (x: any) => x.code == this.selectedCode
        )?.credit;

        this.myForm.controls.courseName.setValue(selectedcourseName);

        this.myForm.controls.courseCredit.setValue(selectedCourseCredit);
      },
      (erMain: any) => {
        console.log(erMain);
        Swal.fire(erMain.error.message);
      }
    );
  }
  changeTeacher() {
    let y = this.myForm.controls.teacherId.value;

    this.selectedTeacher = this.myForm.controls.teacherId.value;
    let selectedCreditToTaken = this.teacherList.find(
      (px: any) => px.id == this.myForm.controls.teacherId.value
    )?.creditToBeTaken;
    let selectedRemainingCredit = this.teacherList.find(
      (px: any) => px.id == this.myForm.controls.teacherId.value
    )?.remainingCredit;
    this.myForm.controls.creditToBeTaken.setValue(selectedCreditToTaken);

    this.myForm.controls.remainingCredit.setValue(selectedRemainingCredit);

    console.log(this.myForm.value);
  }
  changeCourseControl(x: string) {
    // this.getDepartments();
    this.selectedCode = this.myForm.controls.code.value;

    let selectedcourseName = this.courseList.find(
      (px: any) => px.code == this.selectedCode
    )?.name;
    let selectedCourseCredit = this.courseList.find(
      (x: any) => x.code == this.selectedCode
    )?.credit;

    this.myForm.controls.courseName.setValue(selectedcourseName);

    this.myForm.controls.courseCredit.setValue(selectedCourseCredit);
  }

  check(content: any) {
    if (
      this.myForm.value['remainingCredit'] < this.myForm.value['courseCredit']
    ) {
      this.triggerModal(content);
    } else {
      this.onSubmit();
    }
  }
  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
