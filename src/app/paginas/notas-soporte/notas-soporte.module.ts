import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasSoportePageRoutingModule } from './notas-soporte-routing.module';

import { NotasSoportePage } from './notas-soporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasSoportePageRoutingModule
  ],
  declarations: [NotasSoportePage]
})
export class NotasSoportePageModule {}
