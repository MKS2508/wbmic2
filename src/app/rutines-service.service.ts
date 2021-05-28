import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BoardProps } from "src/app/board-props";
import { DeviceProps } from "src/app/device-props";
import { RutinesProps } from "src/app/rutines-props";

@Injectable({
  providedIn: 'root'
})
export class RutinesServiceService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:4000/api/rutines/";

  getRutines(){
    return this.http.get<RutinesProps[]>(this.url);
  }
  
  getRutine(id: number){
    return this.http.get<RutinesProps>(this.url+id);
  }
  
  postRutine(newObject: any){
    return this.http.post<RutinesProps>(this.url, newObject);
  }
  
  putRutine(newObject: any, id:number){
    return this.http.put<RutinesProps>(this.url+id, newObject);
  }
  //
  deleteRutines(idObject: number){
    let httpParams = new HttpParams().set('id', idObject.toString());
  
    const httpOptions = {
        
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'}, )
      };
    
  
     return this.http.delete<RutinesProps>(this.url+idObject, httpOptions);
    
  }
  }
  