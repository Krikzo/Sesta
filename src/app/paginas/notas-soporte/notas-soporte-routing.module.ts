import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasSoportePage } from './notas-soporte.page';

const routes: Routes = [
  {
    path: '',
    component: NotasSoportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasSoportePageRoutingModule {}
