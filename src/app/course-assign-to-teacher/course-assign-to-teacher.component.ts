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

  public studentList: student[] = [];
  public courseList: course[] = [];
  public depatmentList: department[] = [];
  public filteredList: department[] = [];
  public teacherList: any;
  public selectedDepartment: any;
  public selectedCourse: course[] = [];
  public selectedTeacher: any;
  public selectedCode: any;
  public closeModal: string | undefined;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myFormGroup() {
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

  public updatedForm = this.formBuilder.group({
    departmentId: new FormControl('', Validators.required),
    teacherId: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });
  public ngOnInit(): void {
    this.getDepartments();
    this.myFormGroup();
  }

  public get myFormControl() {
    return this.myForm.controls;
  }

  public getDepartments() {
    this.courseAssign.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
      // this.filteredList = data.data;
    });
  }

  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.filteredList = [];
    this.courseList = [];
    console.log('e in filterDropdown -------> ', e);
    this.courseAssign.getDeptDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
        console.log('####filteredList####', this.filteredList);
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public debounceTime(e: any) {
    let str: string = '';
    setTimeout(() => {
      console.log(e.target.value);
      this.filterDropdown(e.target.value);
    }, 1000);
  }
  public addCourse() {
    this.courseAssign.addCourseAssign(this.updatedForm.value).subscribe(
      (obj: any) => {
        this.studentList = [];
        this.teacherList = [];
        this.courseList = [];
        this.depatmentList = [];
        console.log(obj.data);
        this.myFormGroup();
        this.filteredList = [];
        this.myControl.setValue('');
        Swal.fire(obj.message);
      },
      (er: any) => {
        console.log(er.error.message);
        Swal.fire(er.error.message);
      }
    );
  }
  public onConfirm() {
    this.updatedForm.value['code'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myControl.value.id;
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
  }
  public onSubmit() {
    this.updatedForm.value['code'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myControl.value.id;
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
    // console.log(this.updatedForm.value);
  }
  public changeDeptId() {
    console.log('Teacher Id------>', this.myControl.value.id);
    this.courseAssign.getTeacher(this.myControl.value.id).subscribe(
      (obj1) => {
        this.teacherList = obj1.data;
        if (this.teacherList.length == 0) {
          Swal.fire("This Dept. Doesn't have any teacher yet!!!");
          return;
        }
        this.selectedTeacher = this.myForm.controls.teacherId.value;
      },
      (er1: any) => {
        console.log(er1);
        Swal.fire(er1.error.message);
      }
    );
    //---------------------------------
    this.courseAssign.getCourse(this.myControl.value.id).subscribe(
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
  public changeTeacher() {
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
  public changeCourseControl(x: string) {
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

  public check(content: any) {
    if (
      this.myForm.value['remainingCredit'] < this.myForm.value['courseCredit']
    ) {
      this.triggerModal(content);
    } else {
      this.onSubmit();
    }
  }
  public triggerModal(content: any) {
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
