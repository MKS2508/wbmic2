

import {Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MQTTService } from '../mqtt.service';
import { IMqttMessage } from "ngx-mqtt";
import { LoginServiceService } from '../login-service.service';
import { UserProps } from '../user-props';

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
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
  })
export class NavBarComponent implements OnInit {

  events: any[] = [];
  private deviceId: string = '';
  subscription: Subscription = new Subscription;
  public message: string = '';
  @Output() pagina = new EventEmitter<String>();
  alerts: Alert[] = [];

  constructor(  private mqttService: MQTTService, private LoginService: LoginServiceService
) {

  }
  cambiarPag(value: string) {
    this.pagina.emit(value);
    console.log(value);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
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
  tokenJWT:any = ''
  flag = true;
  user: any = {

  }
  cambiarFlag(){
    this.flag = !this.flag;
  }

  logout(){
    this.LoginService.logout()
    this.cambiarPag( 'login') 
  }


  ngOnInit(): void {
    this.mqttService.topic().subscribe(data => {
      this.message = data.payload.toString();

      console.log(this.message)
      this.changeSuccessMessage(this.message)
    })
    this.tokenJWT = localStorage.getItem('JWT_Token');
    this.user.username = localStorage.getItem('username');
    console.log("name: "+this.user)
    //this.subscribeToTopic();

    this.reset()
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    console.log(screenHeight)
    if(screenWidth < 600){
      this.flag=false;
    }
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

  public mostrarAlerta(){
  
  };

  public changeSuccessMessage(message: String) { this._success.next(`${new Date()} - `+message); }


  

}
