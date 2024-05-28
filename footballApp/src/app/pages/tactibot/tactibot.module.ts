import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { TactibotComponent } from './tactibot.component';
import { TactibotRoutingModule } from './tactibot-routing.module';


@NgModule({
  declarations: [
    TactibotComponent // Declara el componente Tactibot
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TactibotRoutingModule // Añade ReactiveFormsModule a las importaciones
  ],
  exports: [
    TactibotComponent // Exporta TactibotComponent para que pueda ser utilizado en otros lugares de la app
  ]
})
export class TactibotModule {}

