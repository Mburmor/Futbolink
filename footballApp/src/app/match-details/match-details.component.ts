import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Match } from '../models/match.models';
import { MatchService } from '../services/match.service';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
  @Input() match?: Match;
  @Output() playerJoined: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public modalController: ModalController,
    private matchService: MatchService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.match && this.match.time instanceof firebase.firestore.Timestamp) {
      this.match.time = this.match.time.toDate();
    }
  }

  close() {
    this.modalController.dismiss();
  }

  joinMatch() {
    if (this.match) {
      const userId = this.authService.getCurrentUserId();
      this.matchService.joinMatch(this.match.id, userId)
        .then(() => {
          this.playerJoined.emit();
          this.close();
        })
        .catch(error => {
          console.error('Error al unirse al partido:', error);
        });
    }
  }

  handlePlayerJoined() {

  }
}
