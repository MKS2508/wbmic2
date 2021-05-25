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

  private url: string = "http://localhost:4000/api/auth/signup";
  private url2: string = "http://localhost:4000/api/auth/signin";

  register(newObject: any){
    this.http.post<UserProps>(this.url, newObject).subscribe((data: any) => {
      localStorage.setItem('JWT_token', data.token);
      return (localStorage.getItem('JWT_token') !== null);
    });
 }


  login(newObject: any){
    console.log("EMAIL "+newObject.email)
    console.log("EMAIL "+newObject.password)

     this.http.post<UserProps>(this.url2, {email:newObject.email, password: newObject.password}).subscribe((data: any) => {
      console.log("TOKEN  "+data.token)
      this.jwtToken ==  data.token;

       localStorage.setItem('JWT_token',  data.token);
       localStorage.setItem('username',  data.user.username);
       localStorage.setItem('userRoles',  JSON.stringify(data.user.roles));

       return data.token 
     });
     console.log("TOKEN2  "+this.jwtToken)

    }

    logout(){
      localStorage.removeItem('JWT_token');
    }
}
