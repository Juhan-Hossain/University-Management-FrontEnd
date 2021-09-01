import { Component, OnInit } from '@angular/core';
import { saveDepartmentService } from '../saveDepartment/save-departmentService.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css'],
})
export class ViewDepartmentComponent implements OnInit {
  departmentList: any;
  errors: any;
  constructor(private viewDepartment: saveDepartmentService) {}

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment() {
    this.errors = null;
    this.viewDepartment.getDepartment().subscribe(
      (data) => {
        this.departmentList = data.data;
        console.log(data);

      },
      (ex) => {
        console.log(ex);
        Swal.fire(ex.error);
      }
    );
  }
}
