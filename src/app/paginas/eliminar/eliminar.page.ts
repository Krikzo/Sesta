import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService, Usuario } from '../../servicios/usuario.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
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
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
        this.presentAlert('Error', 'No se pudieron cargar los usuarios');
      }
    );
  }

  async confirmarEliminacion(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar a ${usuario.nombre} ${usuario.apellido}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarUsuario(usuario);
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarioService.eliminarUsuario(usuario.id).subscribe(
      () => {
        this.presentAlert('Éxito', 'Usuario eliminado correctamente');
        this.cargarUsuarios(); // Recargar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar usuario', error);
        this.presentAlert('Error', 'No se pudo eliminar el usuario');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
} 