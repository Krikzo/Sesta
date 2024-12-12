import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss']
})
export class ContactoPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  enviarMensaje() {
    
    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      mensaje: this.mensaje
    };

    
    this.http.post('http://localhost:3000/post', datos)
      .subscribe(
        response => {
          console.log('Mensaje enviado:', response);
          
          this.nombre = '';
          this.apellido = '';
          this.email = '';
          this.telefono = '';
          this.mensaje = '';
        },
        error => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
  }
}