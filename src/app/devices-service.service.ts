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
token:any = '';
private url: string = "http://localhost:4000/api/iot/connected";

getDevices(pag:number){
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.get<any>(this.url+"?page="+pag+"&limit=3", httpOptions);
}
getDevices2(){
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.get<any>(this.url+'2', httpOptions);
}

getDevice(id: string){
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.get<DeviceProps>(this.url+"/"+id);
}

postDevice(newObject: any){
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.post<DeviceProps>(this.url, newObject, httpOptions);
}

putDevice(newObject: any, id:number){
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.put<DeviceProps>(this.url+"/"+id, newObject, httpOptions);
}
//
deleteDevices(idObject: number){
  let httpParams = new HttpParams().set('id', idObject.toString());

  const httpOptions = {
      
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'}, )
    };
  

   return this.http.delete<BoardProps>(this.url+"/"+idObject, httpOptions);
  
}
}
