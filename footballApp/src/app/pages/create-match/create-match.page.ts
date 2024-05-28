import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.models';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.scss'],
})
export class CreateMatchPage {
  errorMessage: string = '';

  newMatch: Match = {
    id: this.generateUniqueId(),
    location: '',
    time: new Date(),
    type: '5v5',
    players: [],
  };

  constructor(
    private matchService: MatchService,
    private router: Router 
  ) {}

  onCreateMatch() {
    if (!this.newMatch.location || !this.newMatch.time || !this.newMatch.type) {
      this.errorMessage = 'Por favor, rellena todos los campos antes de crear el partido.';
      return;
    }

    // Convertir el valor de tiempo a un objeto Date si es una cadena
    if (typeof this.newMatch.time === 'string') {
      this.newMatch.time = new Date(this.newMatch.time);
    }

    this.matchService.createMatch(this.newMatch).then(() => {
      this.errorMessage = '';
      this.router.navigateByUrl('/match-list');
    }).catch(error => {
      this.errorMessage = 'Hubo un problema al crear el partido. Inténtalo de nuevo.';
      console.error('Error al crear el partido', error);
    });
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
