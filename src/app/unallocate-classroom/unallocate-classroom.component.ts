import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UnassignCoursesService } from '../services/unassign-courses.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UnallocateClassService } from '../services/unallocate-classroom.service';

@Component({
  selector: 'app-unallocate-classroom',
  templateUrl: './unallocate-classroom.component.html',
  styleUrls: ['./unallocate-classroom.component.css'],
})
export class UnallocateClassroomComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private unallocateClassService: UnallocateClassService,
    private modalService: NgbModal
  ) {}
  unassign: boolean = false;
  closeModal: string | undefined;
  ngOnInit(): void {}

  onConfirm() {
    this.unallocateClassService.UnallocatingClasses().subscribe(
      (obj) => {
        Swal.fire('Unallocate all classrooms');
      },
      (er) => {
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      }
    );
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
