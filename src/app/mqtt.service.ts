import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MQTTService {


  private endpoint: string;

  constructor(
    private _mqttService: MqttService,
  ) {
    this.endpoint = 'iot/logging';
  }

  topic(): Observable<IMqttMessage> {
    let topicName = this.endpoint;

    console.log(this._mqttService.observe(topicName));
    this._mqttService.unsafePublish(topicName, "message", {qos: 1, retain: true});
    return this._mqttService.observe(topicName);

  }

}
