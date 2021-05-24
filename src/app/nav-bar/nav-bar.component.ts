

import {Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MQTTService } from '../mqtt.service';
import { IMqttMessage } from "ngx-mqtt";

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

  @Output() pagina = new EventEmitter<String>();
  alerts: Alert[] = [];

  constructor(  private mqttService: MQTTService,
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

  flag = true;

  cambiarFlag(){
    this.flag = !this.flag;
  }



  ngOnInit(): void {
    this.subscribeToTopic();

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
  public changeSuccessMessage() { this._success.next(`${new Date()} - Conectado!`); }


  private subscribeToTopic() {
    this.subscription = this.mqttService.topic()
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        this.events.push(item);
      });
  }

}
