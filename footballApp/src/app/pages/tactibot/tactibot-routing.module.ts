import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TactibotComponent } from './tactibot.component';

const routes: Routes = [
  {
    path: '',
    component: TactibotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TactiBotRoutingModule { }
