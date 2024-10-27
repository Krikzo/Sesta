import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//es para la cerrar sesion
import { Usuario } from '../../servicios/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pageTitle = 'Inicio';
  usuario: Usuario | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  ngOnInit() {
    if (!this.usuario) {
      // Si no hay datos de usuario, redirigir al login
      this.router.navigate(['/login']);
    }
  }
  logout() {
    //se agrega el logout
    
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}