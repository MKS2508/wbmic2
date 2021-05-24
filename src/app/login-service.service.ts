import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { UserProps } from "src/app/user-props";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }


  jwtToken: string = '';

  private url: string = "http://192.168.1.137:4000/api/auth/signup";
  private url2: string = "http://192.168.1.137:4000/api/auth/signin";

  register(newObject: any){
    this.http.post<UserProps>(this.url, newObject).subscribe((data: any) => {
      localStorage.setItem('JWT_token', data.token);
      return (localStorage.getItem('JWT_token') !== null);
    });
 }


  login(newObject: any){
     this.http.post<UserProps>(this.url2, newObject).subscribe((data: any) => {
       data.token = this.jwtToken;
       localStorage.setItem('JWT_token', this.jwtToken);
       return (localStorage.getItem('JWT_token') !== null);
     });
    }

    logout(){
      localStorage.removeItem('JWT_token');
    }
}
