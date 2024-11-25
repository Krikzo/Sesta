import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../servicios/usuario.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pageTitle = 'Inicio';
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private menuCtrl: MenuController  // Agregar esta línea
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  ngOnInit() {
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  async closeMenu() {  // Agregar este método
    await this.menuCtrl.close();
  }

  async logout() {
    await this.menuCtrl.close();  // Cerrar el menú antes de hacer logout
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}