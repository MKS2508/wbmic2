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
  private url5: string = "http://192.168.1.137:4000/api/iot/disconnect";

  token:any = ''

  sendAction( productId: String, deviceId: String, action: String, data: String, pines: any[] ){
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.post<any>(this.url4 + productId + "/" +  deviceId + "/action/" +action,{data:data, pines: pines}, httpOptions); //TODO: REVISAR!
    
  }
  
  connect(productsId: String[]){
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.post<BoardProps[]>(this.url, {productsID:productsId}, httpOptions); //TODO: REVISAR!
  }
  


  disconnect(productsId: String[]){
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.post<BoardProps[]>(this.url5, {productsID:productsId}, httpOptions); //TODO: REVISAR!
  }
  
  setMode(newObject: any){
    return this.http.put<BoardProps>(this.url2, newObject);
  }

  resetMode(newObject: any){
    return this.http.put<BoardProps>(this.url3, newObject);
  }

  }
  