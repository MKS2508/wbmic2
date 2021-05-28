

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ModalDismissReasons, NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeviceProps } from '../device-props';
import { DevicesServiceService } from '../devices-service.service';
import { IotActionsService } from '../iot-actions.service';
import { FormControl } from '@angular/forms';

interface Alert {
  type: string;
  message: string;
}



const ALERTS: Alert[] = [{
    type: 'success',
    message: 'This is an success alert',
  }, {
    type: 'info',
    message: 'This is an info alert',
  }, {
    type: 'warning',
    message: 'This is a warning alert',
  }, {
    type: 'danger',
    message: 'This is a danger alert',
  },
  {
    type: 'error',
    message: 'This is a error alert',
  }
];

var screenWidth: any;
var screenHeight: any;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})


export class MainMenuComponent implements OnInit {

  connectedDevices: DeviceProps[] = []

  
  alerts: Alert[] = [];
  closeResult = '';
  pagina: any = 1;
  pag: any;


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

  red = new FormControl('');
  green = new FormControl('');
  blue = new FormControl('');
  sensor = new FormControl('');
  deviceName = new FormControl('');

  selectedDevice: DeviceProps={
    _id: '',
    name: 'deff',
    type: 'rgb',
    pines: [1,3,4],
    boardID: '',
    address:''
  }

  constructor(private deviceService: DevicesServiceService, private actionsService: IotActionsService, private modalService: NgbModal) {
  }
 getByID(id: string){
  this.deviceService.getDevice(id).subscribe(data => {
    console.log(data);
    this.selectedDevice = data;
  })
 }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  sendAction( productId: String, deviceId: String, action: String, data: String, pines: any[] ){
    console.log("llega" + data)
    this.actionsService.sendAction(productId, deviceId, action, data, pines).subscribe(data => {
      console.log("BOARDS:")
      console.log(data);
})
  }
  reset() {
    this.alerts = Array.from(ALERTS);
  }
    private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  color:any
  flag = true;
  mostrarColor:Boolean = false;
  @Output('pagina') pagina2 = new EventEmitter<String>();

  cambiarPag(value: string) {
    this.pagina2.emit(value);
    this.pagina2.subscribe((data: any) => {
      this.pag = data
    })
    console.log(value);
  }
  cambiarColor(){
    this.mostrarColor = !this.mostrarColor;
  }
  cambiarFlag(){
    this.flag = !this.flag;
  }
  getBoards(pag: number){
    this.deviceService.getDevices(pag).subscribe(data => {
      console.log("BOARDS:")
      console.log(data);

      this.connectedDevices = data.data;



    })
  }
 




  ngOnInit(): void {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    console.log(screenHeight)
    this.getBoards(this.pagina)
   
this.makeSuccesMessage()
  }

  edit(){
    var editedDevice: DeviceProps={
      _id: this.selectedDevice._id,
      name: this.deviceName.value,
      type: this.selectedDevice.type,
      pines: [this.red.value,this.green.value,this.blue.value],
      boardID: this.selectedDevice.boardID,
      address:this.selectedDevice.address
    }
    var editedDevice2: DeviceProps={
      _id: this.selectedDevice._id,
      name: this.deviceName.value,
      type: this.selectedDevice.type,
      pines: [this.sensor.value],
      boardID: this.selectedDevice.boardID,
      address:this.selectedDevice.address
    }
    var pines: Number[] = []
    if(this.selectedDevice.type == 'rgb'){
      this.deviceService.putDevice(editedDevice, this.selectedDevice._id).subscribe(data => {
        console.log(data)
  
      })
    } else {
      this.deviceService.putDevice(editedDevice2, this.selectedDevice._id).subscribe(data => {
        console.log(data)
  
      })
    }
    this.getBoards(this.pagina)
    this.getBoards(this.pagina)

  }


  changePage(pag:number){
    var pagina = this.pagina
    console.log(pagina)
    pagina = pagina + pag
    console.log(pagina)
    this.pagina = pagina
    this.getBoards(this.pagina)
    this.getBoards(this.pagina)

  }
  
  public makeSuccesMessage(){
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

  }
  public changeSuccessMessage() { this._success.next(`${new Date()} - Conectado!`); }




}