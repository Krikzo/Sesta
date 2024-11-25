export interface SolicitudHora {
    id?: number;
    pacienteId: number;
    especialidad: string;
    medico: string;
    fecha: string;
    hora: string;
    motivo: string;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
  }