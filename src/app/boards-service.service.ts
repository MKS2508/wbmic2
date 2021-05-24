import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { BoardProps } from "src/app/board-props";
import { DeviceProps } from "src/app/device-props";

@Injectable({
  providedIn: 'root'
})
export class BoardsServiceService {

  constructor(private http: HttpClient) { }

  private url: string = "http://192.168.1.137:4000/api/productos/";

  getBoards(){
    return this.http.get<BoardProps[]>(this.url);
}

  getBoard(id: number){
    return this.http.get<BoardProps>(this.url+id);
}

  postBoard(newObject: any){
    return this.http.post<BoardProps>(this.url, newObject);
}

  putBoard(newObject: any, id:number){
    return this.http.put<BoardProps>(this.url+id, newObject);
}
//
deleteBoards(idObject: number){
    let httpParams = new HttpParams().set('id', idObject.toString());

    const httpOptions = {
        
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'}, )
      };
    

     return this.http.delete<BoardProps>(this.url+idObject, httpOptions);
    
}
}
