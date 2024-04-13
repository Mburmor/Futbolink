import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Match } from '../models/match.models';
import { PlayerService } from '../services/player.service';
import { ModalController } from '@ionic/angular';
import { MatchDetailsComponent } from '../match-details/match-details.component';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() match?: Match;

  @Output() updateMatch = new EventEmitter<void>();

  constructor(
      private playerService: PlayerService, 
      public modalController: ModalController
        
    ) {}

  ngOnInit(): void {}

  joinMatch() {
    if (this.match?.id) {
      // Aquí debes reemplazar 'current-user-id' con el id real del usuario que se está uniendo
      this.playerService.joinMatch(this.match.id, 'current-user-id')
        .then(() => {
          alert('Te has unido al partido exitosamente!');
          this.updateMatch.emit();
        })
        .catch(error => console.error('Error al unirse al partido:', error));
    }
  }

  openMatchDetails(matchId: string) {
    this.modalController.create({
      component: MatchDetailsComponent,
      componentProps: { matchId: matchId }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(result => {
      if (result.role === 'updateNeeded') {
        // Aquí podrías recargar los datos necesarios o manejar la post-unión
      }
    });
  }
  
}
