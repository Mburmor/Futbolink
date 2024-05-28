import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Match } from '../models/match.models';
import { MatchService } from '../services/match.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() match?: Match;
  players$: Observable<any[]> = of([]);
  @Output() updateMatch = new EventEmitter<void>();

  constructor(
    private matchService: MatchService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.match?.id) {
      this.players$ = this.matchService.getPlayersInMatch(this.match.id).pipe(
        catchError(err => {
          console.error('Error al obtener jugadores', err);
          return of([]);
        })
      );
    }
  }

  joinMatch() {
    if (this.match?.id) {
      this.authService.currentUser.subscribe(currentUser => {
        const userId = currentUser?.uid;

        if (userId && this.match?.id) {
          this.matchService.joinMatch(this.match.id, userId)
            .then(() => {
              this.updateMatch.emit();
              this.ngOnInit();  // Refresh player list
            })
            .catch(error => {
              console.error('Error al unirse al partido:', error);
            });
        } else {
          console.error('Usuario no autenticado o partido no definido');
        }
      });
    } else {
      console.error('Partido no definido');
    }
  }

  leaveMatch() {
    if (this.match?.id) {
      this.authService.currentUser.subscribe(currentUser => {
        const userId = currentUser?.uid;

        if (userId && this.match?.id) {
          this.matchService.leaveMatch(this.match.id, userId)
            .then(() => {
              this.updateMatch.emit();
              this.ngOnInit();  // Refresh player list
            })
            .catch(error => {
              console.error('Error al borrarse del partido:', error);
            });
        } else {
          console.error('Usuario no autenticado o partido no definido');
        }
      });
    } else {
      console.error('Partido no definido');
    }
  }
}
