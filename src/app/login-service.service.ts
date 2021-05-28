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
token:any = ''
  private url: string = "http://localhost:4000/api/auth/signup";
  private url2: string = "http://localhost:4000/api/auth/signin";
  private url3: string = "http://localhost:4000/api/auth/users";


  register(newObject: any){
    this.http.post<UserProps>(this.url, newObject).subscribe((data: any) => {
      localStorage.setItem('JWT_token', data.token);
      return (localStorage.getItem('JWT_token') !== null);
    });
 }
 getUsers() {
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.get<UserProps[]>(this.url3,httpOptions )
}

getUserById(id:String) {
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.get<UserProps>(this.url3+"/"+id,httpOptions )
}

editRoles(roles:String[], id: String) {
  console.log(roles)
  this.token = localStorage.getItem('JWT_token')
  const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'x-access-token':this.token })
  };
  return this.http.put<UserProps>(this.url3+"/"+id,{roles:roles},httpOptions )
}

  login(newObject: any){
    console.log("EMAIL "+newObject.email)
    console.log("EMAIL "+newObject.password)

    return this.http.post<any>(this.url2, {email:newObject.email, password: newObject.password})
  
    }

    logout(){
      localStorage.removeItem('JWT_token');
    }
}
