import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Match } from '../models/match.models';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
  @Input() match?: Match;
  @Output() playerJoined: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    if (this.match && this.match.time instanceof firebase.firestore.Timestamp) {
      this.match.time = this.match.time.toDate();
    }
  }

  close() {
    this.modalController.dismiss();
  }

  handlePlayerJoined() {
    // Handle the event when a player joins or leaves the match
  }
}
