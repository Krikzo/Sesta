import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../servicios/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  async actualizarUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Actualizar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: usuario.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'apellido',
          type: 'text',
          value: usuario.apellido,
          placeholder: 'Apellido'
        },
        {
          name: 'email',
          type: 'email',
          value: usuario.email,
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.usuarioService.actualizarUsuario(usuario.id, data).subscribe(
              (usuarioActualizado: Usuario) => {
                const index = this.usuarios.findIndex(u => u.id === usuarioActualizado.id);
                if (index !== -1) {
                  this.usuarios[index] = usuarioActualizado;
                }
                console.log('Usuario actualizado', usuarioActualizado);
              },
              (error) => console.error('Error al actualizar usuario', error)
            );
          }
        }
      ]
    });
    await alert.present();
  }
}