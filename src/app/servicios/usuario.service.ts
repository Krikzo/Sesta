import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/users';
  private nextId = 1;

  constructor(private http: HttpClient) {
    this.initializeNextId();
  }

  private initializeNextId() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      users => {
        if (users.length > 0) {
          const maxId = Math.max(...users.map(user => typeof user.id === 'number' ? user.id : 0));
          this.nextId = maxId + 1;
        }
      },
      error => console.error('Error initializing nextId:', error)
    );
  }

  registrarUsuario(userData: any): Observable<any> {
    userData.id = this.nextId++;
    return this.http.post(this.apiUrl, userData);
  }

  login(email: string, password: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
  }


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  actualizarUsuario(id: number, userData: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, userData);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarUsuariosPorNombre(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?nombre_like=${nombre}`);
  }
  
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}

