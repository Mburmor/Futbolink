import { Injectable } from '@angular/core';
import { Match } from '../models/match.models'; // Asegúrate de que la ruta sea correcta
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private afs: AngularFirestore) { }

  getAllMatches(): Observable<Match[]> {
    return this.afs.collection<Match>('matches').valueChanges({ idField: 'id' });
  }

  createMatch(match: Match): Promise<void> {
    return this.afs.collection('matches').add(match).then(docRef => {
      console.log('Partido creado con ID: ', docRef.id);
    })
    .catch(error => {
      console.error('Error al crear partido: ', error);
      throw error; // Propagar el error.
    });
  }

  joinMatch(matchId: string, userId: string): Promise<void> {
    const matchRef = this.afs.collection('matches').doc(matchId);
    return this.afs.firestore.runTransaction(async transaction => {
      const matchDoc = await transaction.get(matchRef.ref);
      if (!matchDoc.exists) {
        throw new Error('Partido no encontrado');
      }
  
      // Asegúrate de que los datos del partido sean del tipo Match.
      // Si no estás seguro del tipo exacto, usa 'any', pero lo ideal es usar 'Match'
      const matchData = matchDoc.data() as Match | undefined;
      if (!matchData) {
        throw new Error('Datos del partido no encontrados');
      }
  
      // Inicializa players si aún no está definido
      const playersList: string[] = matchData.players ?? [];
      
      if (playersList.includes(userId)) {
        throw new Error('El usuario ya está apuntado al partido');
      }
  
      playersList.push(userId);
  
      // Actualiza Firestore con la nueva lista de jugadores
      transaction.update(matchRef.ref, { players: playersList });
    })
    .then(() => console.log(`User ${userId} joined match ${matchId}`))
    .catch(error => {
      console.error('Error al unirse al partido', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    });
  }
}
