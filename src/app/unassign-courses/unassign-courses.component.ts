import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';import { Component, OnInit } from '@angular/core';
import { UnassignCoursesService } from '../services/unassign-courses.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-unassign-courses',
  templateUrl: './unassign-courses.component.html',
  styleUrls: ['./unassign-courses.component.css']
})
export class UnassignCoursesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private unassignCourseService: UnassignCoursesService,
    private modalService: NgbModal
  ) {}
  unassign: boolean = false;
  closeModal: string | undefined;
  ngOnInit(): void {
  }

  onConfirm()
  {
    this.unassignCourseService.UnassignAllCourses().subscribe(obj => {

      Swal.fire('Unassigned all courses')

    },
      er => {
        Swal.fire(
          'The Internet?',
          'That thing is still around?',
          'question'
        )

      }
    );

  }
  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
