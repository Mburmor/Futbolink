import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlayerListComponent } from './player-list.component';

@NgModule({
  declarations: [PlayerListComponent],
  imports: [CommonModule, IonicModule],
  exports: [PlayerListComponent]
})
export class PlayerListModule {}
