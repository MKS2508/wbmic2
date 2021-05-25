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

  board2: BoardProps= {
      _id: '',
      connected: false,
      host: '',
      port: 3030,
      mode: [],
      name: 'def',
      pines: []
    
  }
  
  getBoard(id:string) {
    this.boardService.getBoard(id).subscribe(data => {
      this.board2 = data;
      console.log(data)

    })
    console.log(this.board2)
  }

  putBoard(){
    console.log(this.board2)
    var modes: ModeProps[] = []
    var modeProps1: ModeProps = {
      name: "rgb",
      pins: [15,16,14]
    }
    var modeProps2: ModeProps = {
      name: "relay",
      pins: [1,1,1]

    }

    var modeProps3: ModeProps = {
      name: "sensor",
      pins: [1,1,1]

    }

    var modeProps4: ModeProps = {
      name: "piezo",
      pins: [1,1,1]

    }

    for (var i = 0; i<= this.nRGB -1; i++){
      modes.push(modeProps1)
    }

    for (var i = 0; i<= this.nReles-1; i++){
      modes.push(modeProps2)
    }    

    for (var i = 0; i<= this.nSensores-1; i++){
      modes.push(modeProps3)
    }

    for (var i = 0; i<= this.nPiezos -1; i++){
      modes.push(modeProps4)
    }

    var pines: Number[] = []
    var board: BoardProps = {
      _id: this.board2._id,
      connected: false,
      host: this.host.value,
      port: this.port.value,
      mode: modes,
      name: this.nombre.value,
      pines: pines
    }
    console.log(board)
    this.boardService.putBoard(board, this.board2._id).subscribe(data => {
      console.log(data)

    })
    console.log(this.board2)
    this.getBoards();
    this.getBoards();

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


  nReles: number = 0;
  nRGB: number = 0;
  nSensores: number = 0;
  nPiezos: number = 0;

  increaseN(n: string){
    if(n == 'rele'){
      this.nReles ++
    } else if(n == 'rgb'){
      this.nRGB ++
    } else if(n == 'sensor'){
      this.nSensores ++
    } else if(n == 'piezo'){
      this.nPiezos ++
    }
  }

  decreaseN(n: string){
    if(n == 'rele'){
      this.nReles --
    } else if(n == 'rgb'){
      this.nRGB --
    } else if(n == 'sensor'){
      this.nSensores --
    } else if(n == 'piezo'){
      this.nPiezos --
    }  }
  insertNew() {
    console.log(this.host.value);
    var modes: ModeProps[] = []
    var modeProps1: ModeProps = {
      name: "rgb",
      pins: [15,16,14]
    }
    var modeProps2: ModeProps = {
      name: "relay",
      pins: [1,1,1]

    }

    var modeProps3: ModeProps = {
      name: "sensor",
      pins: [1,1,1]

    }

    var modeProps4: ModeProps = {
      name: "piezo",
      pins: [1,1,1]

    }

    for (var i = 0; i<= this.nRGB -1; i++){
      modes.push(modeProps1)
    }

    for (var i = 0; i<= this.nReles-1; i++){
      modes.push(modeProps2)
    }    

    for (var i = 0; i<= this.nSensores-1; i++){
      modes.push(modeProps3)
    }

    for (var i = 0; i<= this.nPiezos -1; i++){
      modes.push(modeProps4)
    }

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
    this.nReles == 0;
    this.nSensores == 0;
    this.nRGB == 0;

    this.getBoards();
  }

  edit(id: string){
    console.log("ID: "+id)
    this.getBoard(id);
  }

  delete(id:string) {
    this.boardService.deleteBoards(id).subscribe(data =>{
      console.log(data)
    })
  }
}
