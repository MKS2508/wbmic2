import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BoardProps } from "src/app/board-props";
import { DeviceProps } from "src/app/device-props";

@Injectable({
  providedIn: 'root'
})
export class BoardsServiceService {
  token:any = ''

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:4000/api/productos/";

  getBoards(){
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.get<BoardProps[]>(this.url, httpOptions);
}

  getBoard(id: string){
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.get<BoardProps>(this.url+id, httpOptions);
}

  postBoard(newObject: any){
    console.error(newObject)

    this.token= localStorage.getItem('JWT_token')
    
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.post<BoardProps>(this.url, newObject, httpOptions);
}

  putBoard(newObject: any, id:string){
    console.warn(newObject)
    this.token= localStorage.getItem('JWT_token')
    const httpOptions = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
    };
    return this.http.put<BoardProps>(this.url+id, newObject, httpOptions);
}
//
deleteBoards(idObject: string){
  
  this.token= localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
    

     return this.http.delete<BoardProps>(this.url+idObject, httpOptions);
    
}
}
