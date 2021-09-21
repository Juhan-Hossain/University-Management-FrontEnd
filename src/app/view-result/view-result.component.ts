import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { course } from '../Models/course';
import { department } from '../Models/department';
import { ViewResultService } from '../services/view-result.service';
import { viewResult } from '../Models/viewResult';
import { studentResult } from '../Models/studentResult';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { student } from '../Models/student';
import { serviceResponse } from '../Models/serviceResponse';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private viewResult: ViewResultService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getStudents();
    this.getDepartments();
    this.myFormGroup();
  }

  public studentList: student[] = [];
  public filteredList: string[] = [];
  public courseList: course[] = [];
  public depatmentList: department[] = [];
  public selectedStudent: string = '';
  public selectedCourse: course[] = [];
  public enrolledCourseList: any;
  public resultView: viewResult[] = [];

  public myForm: FormGroup = new FormGroup({});
  public myControl = new FormControl('');

  public myFormGroup() {
    this.myForm = this.formBuilder.group({
      name: new FormControl(''),
      department: new FormControl(''),
      email: new FormControl(''),
      studentRegNo: new FormControl('', Validators.required),
    });
  }

  //add course through value object
  public getStudents() {
    this.viewResult.getStudent().subscribe((data: any) => {
      this.studentList = data.data;
      // this.filteredList = data.data;
    });
  }
  public getDepartments() {
    this.viewResult.getDepartment().subscribe((data: any) => {
      this.depatmentList = data.data;
    });
  }

  public filterDropdown(e: string) {
    this.myFormGroup();
    this.resultView = [];
    console.log('e in filterDropdown -------> ', e);
    let searchString = '';
    searchString = e.toLowerCase();
    this.viewResult.getStdDDL(e).subscribe(
      (data: serviceResponse) => {
        this.filteredList = data.data;
      },
      (er: serviceResponse) => {
        this.filteredList = [];
      }
    );
  }
  public lastKeyPress: number = 0;
  public debounceTime(e: any) {
    if (e.timeStamp - this.lastKeyPress > 3000) {
      this.filterDropdown(e.target.value);
      this.lastKeyPress = e.timeStamp;
      console.log('$$$Success$$$CALL');
    }
    console.log('###Failed###');
  }

  public displayFn(option: string): string {
    console.log('displayFn value------->', option);
    return option;
  }
  public changeId() {
    this.selectedStudent = this.myControl.value;
    this.myForm.controls['studentRegNo'].setValue(this.selectedStudent);
    this.viewResult.getEnrolledCourse(this.selectedStudent).subscribe(
      (obj1: any) => {
        this.getDepartments();

        let selectedStdDeptId = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.departmentId;

        let selectedStdName = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.name;
        let selectedStdEmail = this.studentList.find(
          (x: any) => x.registrationNumber == this.selectedStudent
        )?.email;

        let departmentName = this.depatmentList.find(
          (x: any) => x.id == selectedStdDeptId
        )?.name;
        this.myForm.controls['name'].setValue(selectedStdName);
        this.myForm.controls['department'].setValue(departmentName);
        this.myForm.controls['email'].setValue(selectedStdEmail);
        this.courseList = obj1.data;
        if (this.courseList.length === 0) {
          Swal.fire("This student doesn't enrolled any course yet! ");
        }
        this.resultView = [];
        for (let i = 0; i < this.courseList.length; i++) {
          let value: viewResult = new viewResult('', '', '');
          value.courseName = this.courseList[i].name;

          value.courseCode = this.courseList[i].code;
          let p = this.courseList[i].courseEnrolls;

          for (let j = 0; j < p.length; j++) {
            if (p[j].studentRegNo === this.selectedStudent) {
              if (p[j].grade !== null) {
                value.gradeLetter = p[j].grade;
              } else {
                value.gradeLetter = 'not graded yet!';
              }
            }
          }
          this.resultView.push(value);
        }
      },
      (er1: any) => {
        console.log(er1);
        Swal.fire(er1.error.message);
      }
    );
  }
  public openPDF(): void {
    let DATA = document.getElementById('pdf')!;

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save(`${this.selectedStudent}.pdf`);
    });
  }
}
