import { Component, OnInit } from '@angular/core';
import { SaveDepartmentService } from '../saveDepartment/save-departmentService.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {

  departmentList: any;
  constructor(private viewDepartment:SaveDepartmentService) { }

  ngOnInit(): void {
    this.getDepartment();
  }


  getDepartment()
  {
    this.viewDepartment.getDepartment().subscribe(data => {
      this.departmentList = data.data;
      console.log(data);
    },ex =>
    {
      console.log(ex);
    });
  }
}
