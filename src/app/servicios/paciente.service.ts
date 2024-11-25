import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
}

export interface CitaMedica {
  id: number;
  pacienteId: number;
  fecha: string;
  hora: string;
  motivoUrgencia: string;
  prioridad: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`);
  }

  getCitasPaciente(pacienteId: number): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.apiUrl}/solicitudes?pacienteId=${pacienteId}`);
  }
}