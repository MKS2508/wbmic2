import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  pagina: String = 'login';
  paginas: String[] = ['login', 'registro', 'boardsMenu', 'iotMenu','rutinas', 'home']
  title = 'wbmic';
  //recibir la pag de bav

  cambiarPag(event: any){
    this.pagina = event;
    console.log(event);
  }
}


