import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../app/servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  canActivate(): boolean {
    if (this.usuarioService.estaAutenticado()) {
      return true; // Usuario autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // No permite el acceso a la ruta
    }
  }
}