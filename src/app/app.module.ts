import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IMqttServiceOptions, MqttModule, MqttService} from 'ngx-mqtt';
import { environment as env } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeNavbarModule, MaterializeButtonModule, MaterializeCardModule, MaterializeModalModule, MaterializeCommonModule, MaterializeLabelModule, MaterializeInputModule, MaterializeButtonToggleGroupModule  } from 'materialize-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { IotMenuComponent } from './iot-menu/iot-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BoardsMenuComponent } from './boards-menu/boards-menu.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { BoardsServiceService } from './boards-service.service';
import { DevicesServiceService } from './devices-service.service';
import { RutinesServiceService } from './rutines-service.service';
import { LoginServiceService } from './login-service.service';
import { MQTTService } from './mqtt.service';
import { IotActionsService } from './iot-actions.service';
import { HttpClient, HttpClientModule, HttpHandler } from  '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: 9001,
  path: '',
};

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    IotMenuComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    BoardsMenuComponent,
    RutinasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeButtonModule,
    MaterializeNavbarModule,
    MaterializeCardModule,
    NgbModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule

  ],

  // tslint:disable-next-line:max-line-length
  providers: [MQTTService,  BoardsServiceService, DevicesServiceService, RutinesServiceService, LoginServiceService, MQTTService, IotActionsService, HttpClient, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
