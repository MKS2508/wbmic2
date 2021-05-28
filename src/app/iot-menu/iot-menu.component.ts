import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardProps } from '../board-props';
import { BoardsServiceService } from '../boards-service.service';
import { DeviceProps } from '../device-props';
import { IotActionsService } from '../iot-actions.service';

@Component({
  selector: 'app-iot-menu',
  templateUrl: './iot-menu.component.html',
  styleUrls: ['./iot-menu.component.scss']
})
export class IotMenuComponent implements OnInit {
  isConnected: string | null = 'false';


  constructor(private boardService:BoardsServiceService, private actionService: IotActionsService, private modalService: NgbModal) { }


 edit(){}
  
flag = false; 
cambiarFlag(){
  this.flag = !this.flag;
}
reset(){

}
public disconnect(){
  this.actionService.disconnect([]).subscribe(data => console.log(data))
}
successMessage: any
ngOnInit(): void {
  this.actionService.isConnected().subscribe(data => {
    if(data.isConnected == true){
      localStorage.setItem('isConnected', 'true')
    } else {
      localStorage.setItem('isConnected', 'false')

    }
  })
  this.isConnected = localStorage.getItem('isConnected')
  this.getBoards();

}
conectar(){
  var selected: String[] = [];

  this.boards.forEach(element => {
    if(element.connected == true){
      selected.push(element._id);
    }
  });
  if(this.isConnected == 'false'){
    this.actionService.connect(selected).subscribe(data => {
      console.log(data)
  })
  }

}
getBoards(){
  this.boardService.getBoards().subscribe(data => {
    console.log("BOARDS:")
    console.log(data);
    this.boards = data;

    this.boards.forEach(element => {
      console.log(element.mode)
    for(var i = 0; i < element.mode.length; i++){
      element.mode[i].name = element.mode[i].name
      element.connected = false;
    }
    });

  })
}


  boards: BoardProps[] = [];


}
