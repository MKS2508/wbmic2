

import {Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MQTTService } from '../mqtt.service';
import { IMqttMessage } from "ngx-mqtt";
import { LoginServiceService } from '../login-service.service';
import { UserProps } from '../user-props';
import { LogServiceService } from '../log-service.service';
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
  pag: String = 'home';
  alerts: Alert[] = [];

  constructor(  private iotActionsService: IotActionsService,private mqttService: MQTTService, private LoginService: LoginServiceService, private LogService: LogServiceService
) {

  }
  cambiarPag(value: string) {
    this.pagina.emit(value);
    this.pagina.subscribe(data => {
      this.pag = data
    })
    console.log(value);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

 private _success = new Subject<string>();
 private _error = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';
  errorMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  tokenJWT:any = ''
  flag = true;
  rolesArr: string[]= []
  user: any = {

  }
  cambiarFlag(){
    this.flag = !this.flag;
  }

  logout(){
    this.LoginService.logout()
    this.cambiarPag( 'login') 
  }

username: string | null = ''
  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    this.tokenJWT = localStorage.getItem('JWT_Token');
    this.username = localStorage.getItem('username');
    this.user.roles = localStorage.getItem('userRoles');

    var roles: any[] = []
    roles = JSON.parse(this.user.roles)

    roles.forEach(element => {
      this.rolesArr.push(element.name)
    });
    this.user.roles = this.rolesArr
    console.log("name: "+this.user)
    //this.subscribeToTopic();
    this.mqttService.topic().subscribe(data => {
      this.message = data.payload.toString();

      console.log(this.message)
      if(this.message.split('_')[0] === 'error'){
        this.changeErrorMessage(this.message)
      } else {
        this.changeSuccessMessage(this.message)

      }
//insertar
      this.LogService.addLog(this.user.username, this.message).subscribe(data => console.log(data))
      this.cambiarPag( 'home') 

    })
    this.reset()
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    console.log(screenHeight)
    if(screenWidth < 600){
      this.flag=false;
    }
this.makeSuccesMessage()
this.makeErrorMessage()

  }

  public disconnect(){
    this.iotActionsService.disconnect([]).subscribe(data => console.log(data))
  }
  public makeErrorMessage(){

    this._error.subscribe(message => this.errorMessage = message.split('_')[1]);
    
   

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
  public changeErrorMessage(message: String) { this._error.next(`${new Date()} - `+message); }


  

}
