import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Importa el archivo de entorno

export interface Solicitud {
  id?: number;
  nombrePaciente: string;
  rutPaciente: string;
  motivoUrgencia: string;
  fecha: string;
  hora: string;
  prioridad: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.apiUrl}/solicitudes`; // Usa la URL del entorno

  constructor(private http: HttpClient) { }

  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }
}