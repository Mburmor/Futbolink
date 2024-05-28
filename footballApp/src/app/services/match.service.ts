import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Match } from '../models/match.models';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private afs: AngularFirestore) {}

  getAllMatches(): Observable<Match[]> {
    return this.afs.collection<Match>('matches').valueChanges({ idField: 'id' });
  }

  createMatch(match: Match): Promise<void> {
    return this.afs.collection('matches').add(match).then(docRef => {
      console.log('Partido creado con ID: ', docRef.id);
    }).catch(error => {
      console.error('Error al crear partido: ', error);
      throw error;
    });
  }

  joinMatch(matchId: string, userId: string): Promise<void> {
    const matchRef = this.afs.collection('matches').doc(matchId);
    return this.afs.firestore.runTransaction(async transaction => {
      const matchDoc = await transaction.get(matchRef.ref);
      if (!matchDoc.exists) {
        throw new Error('Partido no encontrado');
      }

      const matchData = matchDoc.data() as Match | undefined;
      if (!matchData) {
        throw new Error('Datos del partido no encontrados');
      }

      const playersList: string[] = matchData.players ?? [];
      if (playersList.includes(userId)) {
        throw new Error('El usuario ya está apuntado al partido');
      }

      playersList.push(userId);
      transaction.update(matchRef.ref, { players: playersList });
    }).then(() => console.log(`User ${userId} joined match ${matchId}`))
      .catch(error => {
        console.error('Error al unirse al partido', error);
        throw error;
      });
  }

  leaveMatch(matchId: string, userId: string): Promise<void> {
    const matchRef = this.afs.collection('matches').doc(matchId);
    return this.afs.firestore.runTransaction(async transaction => {
      const matchDoc = await transaction.get(matchRef.ref);
      if (!matchDoc.exists) {
        throw new Error('Partido no encontrado');
      }

      const matchData = matchDoc.data() as Match | undefined;
      if (!matchData) {
        throw new Error('Datos del partido no encontrados');
      }

      const playersList: string[] = matchData.players ?? [];
      if (!playersList.includes(userId)) {
        throw new Error('El usuario no está apuntado al partido');
      }

      const updatedPlayersList = playersList.filter(player => player !== userId);
      transaction.update(matchRef.ref, { players: updatedPlayersList });
    }).then(() => console.log(`User ${userId} left match ${matchId}`))
      .catch(error => {
        console.error('Error al borrarse del partido', error);
        throw error;
      });
  }

  getPlayersInMatch(matchId: string): Observable<any[]> {
    return this.afs.collection('matches').doc(matchId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Match;
        return data.players ?? [];
      }),
      switchMap(playerIds => {
        if (playerIds.length === 0) {
          return of([]);
        }

        const players$ = playerIds.map(playerId =>
          this.afs.collection('users').doc(playerId).valueChanges()
        );
        return combineLatest(players$);
      })
    );
  }
}
