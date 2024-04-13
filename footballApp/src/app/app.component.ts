import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Crear Partido', url: '/create-match', icon: 'add-circle' },
    { title: 'Lista de Partidos', url: '/match-list', icon: 'list' },
  ];

  constructor() {}
}
