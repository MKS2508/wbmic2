import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RutinesServiceService } from '../rutines-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RutinesProps } from '../rutines-props';
import { DevicesServiceService } from '../devices-service.service';
import { DeviceProps } from '../device-props';


@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})


export class RutinasComponent implements OnInit {
  countries: any = [];
 
  devices: DeviceProps[] = []
  flag= false;
  nombre = new FormControl('');
  accion = new FormControl('');
  hora = new FormControl('');
  pin = new FormControl('');

  fecha = new FormControl('');
  deviceID = new FormControl('');
  repeticion = new FormControl('');


  constructor(private rutinesService: RutinesServiceService, private devicesService: DevicesServiceService, private modalService: NgbModal) { 

  }

  getRutines(){
    this.rutinesService.getRutines().subscribe(data => {
      console.log(data);
      this.countries = data;
    })
  }

  getDevices(){
    this.devicesService.getDevices2().subscribe(data => {
      console.log(data);
      this.countries = data;
    })
  }
  ngOnInit(): void {
    this.getRutines()
    this.getDevices();
  }

  closeResult = '';

  open(content: any) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return `with: ${reason}`;
     }
   }


   insertNew() {

   var  rutine: RutinesProps = {
      id: '',
      name: this.nombre.value,
      action: this.deviceID.value+'/'+this.accion.value+'/_'+this.pin.value,
      deviceID: this.deviceID.value,
      time: this.hora.value+':00',
      date: this.fecha.value,
      repeat: this.repeticion.value
      
    }
    console.log(this.accion.value);
    this.rutinesService.postRutine(rutine).subscribe(data =>{
      console.log(data)
    })

    this.getRutines();


  }   
}
