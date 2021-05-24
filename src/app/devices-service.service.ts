import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BoardProps } from "src/app/board-props";
import { DeviceProps } from "src/app/device-props";
@Injectable({
  providedIn: 'root'
})
export class DevicesServiceService {
//solo estaran los conectados, si nos desconectamos, se borra los datos de la tabla
constructor(private http: HttpClient) { }

private url: string = "http://192.168.1.137:4000/api/iot/connected";

getDevices(){
  return this.http.get<DeviceProps[]>(this.url);
}

getDevice(id: number){
  return this.http.get<DeviceProps>(this.url+id);
}

postDevice(newObject: any){
  return this.http.post<DeviceProps>(this.url, newObject);
}

putDevice(newObject: any, id:number){
  return this.http.put<DeviceProps>(this.url+id, newObject);
}
//
deleteDevices(idObject: number){
  let httpParams = new HttpParams().set('id', idObject.toString());

  const httpOptions = {
      
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'}, )
    };
  

   return this.http.delete<BoardProps>(this.url+idObject, httpOptions);
  
}
}
