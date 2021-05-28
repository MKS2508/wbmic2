import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { UserProps } from '../user-props';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new FormControl('');
  pwd = new FormControl('');
  
  @Output() pagina = new EventEmitter<String>();
  constructor(private LoginService: LoginServiceService) {
    
  }
  cambiarPag(value: string) {
    this.pagina.emit(value);
    console.log(value);
  }

  login() {

    var usuario:UserProps = {
      _id:'',
      email:this.user.value,
      password: this.pwd.value,
      username: '',
      roles : []
    }
    this.LoginService.login(usuario).subscribe(data => {
      localStorage.removeItem('JWT_token')
      localStorage.setItem('JWT_token', '0')
      localStorage.removeItem('userRoles')
      localStorage.removeItem('admin')
      localStorage.removeItem('username')
      localStorage.setItem('JWT_token', data.token)
      localStorage.setItem('userRoles', JSON.stringify(data.user.roles))
      localStorage.setItem('username', data.username)
      if(data.user.roles.includes('admin')){
        localStorage.setItem('admin', 'true')
      }

      if(data.token != ''){
        this.cambiarPag('home')
      }
      console.log(data)
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
