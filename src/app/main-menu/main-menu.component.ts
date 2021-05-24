

import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { DeviceProps } from '../device-props';
import { DevicesServiceService } from '../devices-service.service';
import { IotActionsService } from '../iot-actions.service';

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

  constructor(private deviceService: DevicesServiceService, private actionsService: IotActionsService) {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  sendAction( productId: String, deviceId: String, action: String, data: String ){
    console.log("llega" + data)
    this.actionsService.sendAction(productId, deviceId, action, data).subscribe(data => {
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
  cambiarColor(){
    this.mostrarColor = !this.mostrarColor;
  }
  cambiarFlag(){
    this.flag = !this.flag;
  }
  getBoards(){
    this.deviceService.getDevices().subscribe(data => {
      console.log("BOARDS:")
      console.log(data);

      this.connectedDevices = data;



    })
  }
 




  ngOnInit(): void {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    console.log(screenHeight)
    this.getBoards()
   
this.makeSuccesMessage()
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