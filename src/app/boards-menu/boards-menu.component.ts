import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {BoardProps} from '../board-props';
import {BoardsServiceService} from '../boards-service.service';
@Component({
  selector: 'app-boards-menu',
  templateUrl: './boards-menu.component.html',
  styleUrls: ['./boards-menu.component.scss']
})
export class BoardsMenuComponent implements OnInit {

  boardPropsArr: BoardProps[] = [];

  closeResult = '';

  constructor(private modalService: NgbModal, private boardService: BoardsServiceService) {}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(){
    this.boardService.getBoards().subscribe(data => {
      console.log("BOARDS:")
      console.log(data);
      this.boardPropsArr = data;

      this.boardPropsArr.forEach(element => {
        console.log(element.mode)
      for(var i = 0; i < element.mode.length; i++){
        element.mode[i] = element.mode[i].name
      }
      });

    })
  }

  flag=false;
  boards = ["a","a"];




  host = new FormControl('');
  port = new FormControl('');
  mode = new FormControl('');
  nombre = new FormControl('');
  pines = new FormControl('');


  insertNew() {
    console.log(this.host.value);
    var board: BoardProps = {
      _id: '',
      connected: false,
      host: this.host.value,
      port:this.port.value,
      mode: [this.mode.value],
      name: this.nombre.value,
      pines: [this.pines.value],
    }
    this.boardService.postBoard(board).subscribe(data =>{
      console.log(data)
    })

    this.getBoards();
  }

  delete() {

  }
}
