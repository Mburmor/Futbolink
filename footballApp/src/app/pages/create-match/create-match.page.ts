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
  day: string = '';
  month: string = '';
  hour: string = '';
  minute: string = '';
  errorMessage: string = '';
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = Array.from({ length: 12 }, (_, i) => i + 1);
  hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  minutes = ['00', '15', '30', '45'];

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

    if (!this.day || !this.month || !this.hour || !this.minute || !this.newMatch.location || !this.newMatch.type) {
      this.errorMessage = 'Por favor, rellena todos los campos antes de crear el partido.';
      return;
    }


    const matchDate = new Date();
    matchDate.setDate(parseInt(this.day));
    matchDate.setMonth(parseInt(this.month) - 1);
    matchDate.setHours(parseInt(this.hour), parseInt(this.minute));
    this.newMatch.time = matchDate;

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
