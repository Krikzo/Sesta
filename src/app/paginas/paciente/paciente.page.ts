import { Component, OnInit } from '@angular/core';
import { PacienteService, Paciente, CitaMedica } from '../../servicios/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = []; 
  citasPaciente: CitaMedica[] = [];
  pacienteSeleccionado: Paciente | null = null;
  rutBusqueda: string = '';  

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.pacientesFiltrados = pacientes;  
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    });
  }

  
  buscarPorRut(event: any) {
    const rut = event.target.value.toLowerCase();
    this.rutBusqueda = rut;
    
    if (rut.trim() === '') {
      this.pacientesFiltrados = this.pacientes;
    } else {
      this.pacientesFiltrados = this.pacientes.filter(paciente => 
        paciente.rut.toLowerCase().includes(rut)
      );
    }
  }

  // Método para limpiar la búsqueda
  limpiarBusqueda() {
    this.rutBusqueda = '';
    this.pacientesFiltrados = this.pacientes;
  }

  verCitasPaciente(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.pacienteService.getCitasPaciente(paciente.id).subscribe({
      next: (citas) => {
        this.citasPaciente = citas;
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }
}