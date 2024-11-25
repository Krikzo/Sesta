import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudHoraPageRoutingModule } from './solicitud-hora-routing.module';
import { SolicitudHoraPage } from './solicitud-hora.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SolicitudHoraPageRoutingModule
  ],
  declarations: [SolicitudHoraPage]
})
export class SolicitudHoraPageModule { }