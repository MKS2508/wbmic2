import { Component, OnInit } from '@angular/core';
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

  constructor(private boardService:BoardsServiceService, private actionService: IotActionsService) { }
flag = false; 
cambiarFlag(){
  this.flag = !this.flag;
}
reset(){

}
successMessage: any
ngOnInit(): void {
  this.getBoards();
  
}
conectar(){
  var selected: String[] = [];

  this.boards.forEach(element => {
    if(element.connected == true){
      selected.push(element._id);
    }
  });
  this.actionService.connect(selected).subscribe(data => {
    console.log(data)
})
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
