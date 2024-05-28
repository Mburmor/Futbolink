import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { MatchService } from '../../services/match.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Match } from '../../models/match.models';
import { MatchDetailsComponent } from '../../match-details/match-details.component';
import { PlayerService } from 'src/app/services/player.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.scss'],
})
export class MatchListPage implements OnInit, OnDestroy {
  public matches$!: Observable<Match[]>;
  public allMatches: Match[] = [];
  public filteredMatches: Match[] = [];
  public selectedType: string = '';
  private matchesSubscription?: Subscription;
  private currentUserId?: string;

  constructor(
    private matchService: MatchService,
    public modalController: ModalController,
    private playerService: PlayerService,
    private authService: AuthenticationService, // Asegúrate de que el servicio se importe correctamente
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.matches$ = this.matchService.getAllMatches().pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
    this.matchesSubscription = this.matches$.subscribe(matches => {
      this.allMatches = matches;
      this.applyFilter();
    });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  async presentMatchDetails(match: Match) {
    const modal = await this.modalController.create({
      component: MatchDetailsComponent,
      componentProps: { match: match }
    });
    return await modal.present();
  }

  onJoinMatch(matchId: string): void {
    const userId = this.authService.getCurrentUserId();
    const userName = this.authService.getCurrentUserName();

    this.playerService.joinMatch(matchId, userId).then(() => {
      console.log(`${userName} se ha unido al partido ${matchId}`);
    }).catch(error => {
      console.error('Error al unirse al partido:', error);
    });
  }

  onTypeChange() {
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedType) {
      this.filteredMatches = this.allMatches.filter(match => match.type === this.selectedType);
    } else {
      this.filteredMatches = [...this.allMatches];
    }
  }

  getCurrentUserId(): string {
    return this.authService.getCurrentUserId();
  }
}
