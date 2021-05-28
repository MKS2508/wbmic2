import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { UserProps } from '../user-props';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {


  user = new FormControl('');
  pwd = new FormControl('');
  email = new FormControl('');

  
  @Output() pagina = new EventEmitter<String>();
  constructor(private LoginService: LoginServiceService) {
    
  }
  cambiarPag(value: string) {
    this.pagina.emit(value);
    console.log(value);
  }

  registro() {

    var usuario:UserProps = {
      _id:'',
      email:this.email.value,
      password: this.pwd.value,
      username: this.user.value,
      roles : []
    }
    this.LoginService.register(usuario).subscribe(data => {
      console.log(data.token)
      localStorage.removeItem('JWT_token')
      localStorage.setItem('JWT_token', '0')
      localStorage.removeItem('userRoles')
      localStorage.removeItem('admin')
      localStorage.removeItem('user')
      localStorage.removeItem('username')
      localStorage.setItem('JWT_token', data.token)

      if(data.token != ''){
        console.log("data")

        this.cambiarPag('login')
      }
    })
    
  }



  ngOnInit(): void {
    localStorage.removeItem('JWT_token')
    localStorage.setItem('JWT_token', '0')
    localStorage.removeItem('userRoles')
    localStorage.removeItem('admin')
    localStorage.removeItem('username')
  }
}
