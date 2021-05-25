import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BoardProps } from '../board-props';
import { BoardsServiceService } from '../boards-service.service';
import { ModeProps } from '../mode-props';
@Component({
  selector: 'app-boards-menu',
  templateUrl: './boards-menu.component.html',
  styleUrls: ['./boards-menu.component.scss']
})
export class BoardsMenuComponent implements OnInit {

  boardPropsArr: BoardProps[] = [];

  closeResult = '';

  constructor(private modalService: NgbModal, private boardService: BoardsServiceService) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  getBoards() {
    this.boardService.getBoards().subscribe(data => {
      console.log("BOARDS:")
      console.log(data);
      this.boardPropsArr = data;

      this.boardPropsArr.forEach(element => {
        console.log(element.mode)
        for (var i = 0; i < element.mode.length; i++) {
          element.mode[i].name = element.mode[i].name
        }
      });

    })
  }

  flag = false;
  boards = ["a", "a"];




  host = new FormControl('');
  port = new FormControl('');
  mode = new FormControl('');

  mode2 = new FormControl('');
  mode3 = new FormControl('');
  mode4 = new FormControl('');

  nombre = new FormControl('');
  pines = new FormControl('');


  insertNew() {
    console.log(this.host.value);
    var modes: ModeProps[] = []
    var modeProps1: ModeProps = {
      name: "rgb",
      pin1: 16,
      pin2: 15,
      pin3: 14
    }
    var modeProps2: ModeProps = {
      name: "relay",
      pin1: 1,
      pin2: 1,
      pin3: 1
    }

    var modeProps3: ModeProps = {
      name: "sensor",
      pin1: 1,
      pin2: 1,
      pin3: 1
    }

    var modeProps4: ModeProps = {
      name: this.mode4.value,
      pin1: 1,
      pin2: 1,
      pin3: 1
    }
    modes.push(modeProps1)
    modes.push(modeProps2)
    modes.push(modeProps3)
    modes.push(modeProps4)

    var pines: Number[] = []
    var board: BoardProps = {
      _id: '',
      connected: false,
      host: this.host.value,
      port: this.port.value,
      mode: modes,
      name: this.nombre.value,
      pines: pines
    }
    this.boardService.postBoard(board).subscribe(data => {
      console.log(data)
    })

    this.getBoards();
  }

  delete() {

  }
}
