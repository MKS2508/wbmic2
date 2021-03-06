import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:4000/api/log";

  
  
  
  addLog(username: string, logMsg: string ){
    return this.http.post<any>(this.url, {username:username, logMessage: logMsg}); //TODO: REVISAR!
  }

  getLogs(page:number){
    return this.http.get<any>(this.url+"?page="+page);
  }
  

}