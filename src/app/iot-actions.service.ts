import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BoardProps } from "src/app/board-props";
import { DeviceProps } from "src/app/device-props";
import { RutinesProps } from "src/app/rutines-props";

@Injectable({
  providedIn: 'root'
})

export class IotActionsService {

  constructor(private http: HttpClient) { }

  private url: string = "http://192.168.1.137:4000/api/iot/connect";
  private url2: string = "http://192.168.1.137:4000/api/iot/setModes";
  private url3: string = "http://192.168.1.137:4000/api/iot/resetModes";
  private url4: string = "http://192.168.1.137:4000/api/iot/";

  
  sendAction( productId: String, deviceId: String, action: String, data: String ){

    return this.http.post<any>(this.url4 + productId + "/" +  deviceId + "/action/" +action,{data:data}); //TODO: REVISAR!
  }
  
  connect(productsId: String[]){
    return this.http.post<BoardProps[]>(this.url, {productsID:productsId}); //TODO: REVISAR!
  }
  
  setMode(newObject: any){
    return this.http.put<BoardProps>(this.url2, newObject);
  }

  resetMode(newObject: any){
    return this.http.put<BoardProps>(this.url3, newObject);
  }

  }
  