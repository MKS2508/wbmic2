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

  cambiarPag(value: string) {
    this.pagina.emit(value);
    console.log(value);
  }

  login() {

    var usuario:UserProps = {
      email:this.user.value,
      password: this.pwd.value,
      username: '',
      roles : []
    }

console.log(this.LoginService.login(usuario) )
    if(this.LoginService.login(usuario) != null){
      this.cambiarPag("home")
    }

    if(localStorage.getItem('JWT_Token') == null){
      this.cambiarPag("home")
    }

  }

  constructor(private LoginService: LoginServiceService) {
    
   }

  ngOnInit(): void {
  }

}
