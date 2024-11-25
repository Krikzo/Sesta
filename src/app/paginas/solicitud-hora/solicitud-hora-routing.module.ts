import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudHoraPage } from './solicitud-hora.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudHoraPageRoutingModule {}
