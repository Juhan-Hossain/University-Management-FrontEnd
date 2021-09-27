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
import { AllocateClassroomService } from '../services/allocate-classroom.service';

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
    private allocateClass: AllocateClassroomService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  public courseList: course[] = [];
  public filteredList: department[] = [];
  public teacherList: any;
  public selectedTeacher: any;
  public selectedCode: any;
  public closeModal: string | undefined;
  public lastKeyPress: number = 0;
  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');
  public myCode = new FormControl('');
  public myTeacher = new FormControl('');
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
    courseId: new FormControl('', Validators.required),
  });
  public ngOnInit(): void {
    this.myFormGroup();
  }

  public get myFormControl() {
    return this.myForm.controls;
  }

  public displayFn(option: department): string {
    console.log('displayFn value------->', option.name);
    return option.name;
  }

  public filterDropdown(e: string) {
    this.teacherList = [];
    this.courseList = [];
    this.myFormGroup();
    this.filteredList = [];
    this.myCode = new FormControl('');
    this.myTeacher = new FormControl('');
    console.log('e in filterDropdown -------> ', e);
    this.allocateClass.getDeptDDL(e).subscribe(
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
    if (e.timeStamp - this.lastKeyPress > 1500) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }
  public addCourse() {
    console.log('updated form value--->', this.updatedForm.value);
    this.courseAssign.addCourseAssign(this.updatedForm.value).subscribe(
      (obj: any) => {
        this.teacherList = [];
        this.courseList = [];
        console.log(obj.data);
        this.myFormGroup();
        this.filteredList = [];
        this.myControl = new FormControl('');
        this.myCode = new FormControl('');
        this.myTeacher = new FormControl('');
        Swal.fire(obj.message);
      },
      (er: any) => {
        console.log(er.error.message);
        Swal.fire(er.error.message);
      }
    );
  }
  public onConfirm() {
    this.updatedForm.value['courseId'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myControl.value.id;
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
  }
  public onSubmit() {
    this.updatedForm.value['courseId'] = this.myForm.value['code'];
    this.updatedForm.value['departmentId'] = this.myControl.value.id;
    this.updatedForm.value['teacherId'] = this.myForm.value['teacherId'];
    this.addCourse();
    // console.log(this.updatedForm.value);
  }
  public changeCourseCode() {
    console.log('selected course ID@@@@', this.myCode.value.id);
    this.myForm.controls['code'].setValue(this.myCode.value.id);
  }
  public displayCourse(option: course): string {
    return option.name;
  }

  public filterCourse(e: string) {
    this.courseList = [];
    this.allocateClass.getCourse(this.myControl.value.id, e).subscribe(
      (data: serviceResponse) => {
        this.courseList = data.data;
      },
      (er: serviceResponse) => {
        this.courseList = [];
      }
    );
  }
  public courseKey: number = 0;
  public courseDDL(e: any) {
    if (e.timeStamp - this.courseKey > 1500) {
      this.filterCourse(e.target.value);
      this.courseKey = e.timeStamp;
    }
  }
  public changeTeacherId() {
    this.myForm.controls['teacherId'].setValue(this.myTeacher.value.id);
    console.log('teacherList##########------->', this.teacherList);
  }
  public displayTeacher(option: course): string {
    return option.name;
  }

  public filterTeacher(e: string) {
    this.teacherList = [];
    this.courseAssign.getTeacher(this.myControl.value.id, e).subscribe(
      (data: serviceResponse) => {
        this.teacherList = data.data;
      },
      (er: serviceResponse) => {
        this.teacherList = [];
      }
    );
  }
  public teacherKey: number = 0;
  public teacherDDL(e: any) {
    if (e.timeStamp - this.teacherKey > 1500) {
      this.filterTeacher(e.target.value);
      this.teacherKey = e.timeStamp;
    }
  }
  public changeDeptId() {
    this.teacherList = [];
    this.courseList = [];
    this.myFormGroup();
    this.filteredList = [];
    this.myCode = new FormControl('');
    this.myTeacher = new FormControl('');
    this.myForm.controls['departmentId'].setValue(this.myControl.value.id);
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
  public changeCourseControl() {
    // this.getDepartments();
    this.selectedCode = this.myForm.controls.code.value;

    let selectedcourseName = this.courseList.find(
      (px: any) => px.id == this.selectedCode
    )?.name;
    let selectedCourseCredit = this.courseList.find(
      (x: any) => x.id == this.selectedCode
    )?.credit;

    this.myForm.controls.courseName.setValue(selectedcourseName);

    this.myForm.controls.courseCredit.setValue(selectedCourseCredit);
  }

  public check(content: any) {
    if (
      this.myForm.value['creditToBeTaken'] < this.myForm.value['courseCredit']
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
