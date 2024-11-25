import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SolicitudService, Solicitud } from './solicitud.servicio.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-hora',
  templateUrl: './solicitud-hora.page.html',
  styleUrls: ['./solicitud-hora.page.scss'],
})
export class SolicitudHoraPage implements OnInit {
  solicitudForm: FormGroup;
  minDate = new Date().toISOString();

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private solicitudService: SolicitudService,
    private router: Router
  ) {
    this.solicitudForm = this.formBuilder.group({
      nombrePaciente: ['', Validators.required],
      rutPaciente: ['', Validators.required],
      motivoUrgencia: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      prioridad: ['', Validators.required]
    });
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.solicitudForm.valid) {
      const solicitud: Solicitud = this.solicitudForm.value;
      
      this.solicitudService.crearSolicitud(solicitud).subscribe({
        next: (response) => {
          console.log('Solicitud guardada:', response);
          this.presentToast('Hora agendada con éxito', 'success');
          this.solicitudForm.reset();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          this.presentToast('Error al agendar la hora', 'danger');
        }
      });
    } else {
      this.presentToast('Por favor complete todos los campos', 'warning');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}