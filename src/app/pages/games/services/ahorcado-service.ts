import { Injectable, computed, inject, signal } from '@angular/core';
import {
  GameStateModel,
  RevealWordModel,
  SelectedKeyModel
} from '../../../../models/ahorcado';
import { AhorcadoLeaderboardService } from './ahorcado-leaderboard-service';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  readonly words: string[] = happyWords;

  // SIGNAL STATE
  readonly selectedKeys = signal<SelectedKeyModel[]>([]);

  readonly wordToReveal = signal<RevealWordModel>({
    fullWord: '',
    splittedWord: []
  });

  readonly gameState = signal<GameStateModel>({
    inGame: false,
    triesLeft: 6,
    victory: false
  });

  // DEPENDENCIES
  private _authService = inject(AuthService);
  private _leaderboardService = inject(AhorcadoLeaderboardService);

  // COMPUTED
  readonly correctKeys = computed(() =>
    this.selectedKeys()
      .filter(key => key.correctLetter)
  );

  readonly wrongKeys = computed(() =>
    this.selectedKeys()
      .filter(key => !key.correctLetter)
  );

  readonly revealedWord = computed(() => {
    const word = this.wordToReveal();
    return word.splittedWord.map(letter => {
      const isRevealed = this.correctKeys()
        .some(key => key.key === letter);

      return isRevealed ? letter : '-';
    });
  });

  // GAME METHODS
  startNewGame(): void {
    const selectedWord = this.getRandomWord();

    this.wordToReveal.set({
      fullWord: selectedWord,
      splittedWord: selectedWord.split('')
    });

    this.selectedKeys.set([]);

    this.gameState.set({
      inGame: true,
      triesLeft: 6,
      victory: false
    });
  }

  async addKey(key: string): Promise<void> {

    const alreadySelected = this.selectedKeys()
      .some(selectedKey => selectedKey.key === key);

    if (alreadySelected) return;

    const correctLetter =
      this.wordToReveal()
        .splittedWord
        .includes(key);

    this.selectedKeys.update(keys => [
      ...keys,
      { key, correctLetter }
    ]);

    // WRONG LETTER
    if (!correctLetter) {
      const currentState = this.gameState();

      // GAME OVER
      if (currentState.triesLeft <= 1) {
        this.gameState.set({
          inGame: false,
          triesLeft: 0,
          victory: false
        });
        await this.saveGameResult(false);

        return;
      }

      this.gameState.update(state => ({
        ...state,
        triesLeft: state.triesLeft - 1
      }));

      return;
    }

    // CHECK VICTORY
    const hasWon = this.wordToReveal()
      .splittedWord
      .every(letter =>
        this.correctKeys()
          .some(key => key.key === letter)
      );

    if (hasWon) {
      this.gameState.update(state => ({
        ...state,
        inGame: false,
        victory: true
      }));

      await this.saveGameResult(true);
    }
  }

  endCurrentGame(): void {
    this.gameState.set({
      inGame: false,
      triesLeft: 6,
      victory: false
    });
  }

  getRevealedLetter(
    letter: string
  ): string {
    const isRevealed = this.correctKeys()
      .some(key => key.key === letter);

    return isRevealed ? letter : '-';
  }

  // PRIVATE METHODS
  private getRandomWord(): string {
    const wordIndex = Math.floor(
      Math.random() * this.words.length
    );

    return this.words[wordIndex]
      .toUpperCase();
  }

  private async saveGameResult(
    won: boolean
  ): Promise<void> {
    const user =
      this._authService.currentUser();

    const profile =
      this._authService.currentProfile();

    if (!user || !profile) return;

    await this._leaderboardService.saveResult({
      userId: user.id,
      userName:
        `${profile.first_name} ${profile.last_name}`,
      won,
      wrongLetters: this.wrongKeys().length
    });
  }
}

const happyWords = [
  'Amor',
  'Felicidad',
  'Sonrisa',
  'Paz',
  'Alegria',
  'Esperanza',
  'Bondad',
  'Gratitud',
  'Armonia',
  'Amistad',
  'Optimismo',
  'Sinceridad',
  'Risas',
  'Compasion',
  'Ternura',
  'Abrazo',
  'Risueño',
  'Bendicion',
  'Serenidad',
  'Dulzura',
  'Encanto',
  'Exito',
  'Generosidad',
  'Agradecimiento',
  'Plenitud',
  'Libertad',
  'Admiracion',
  'Maravilla',
  'Encantamiento',
  'Solidaridad',
  'Confianza',
  'Vitalidad',
  'Esplendor',
  'Resplandor',
  'Inspiracion',
  'Extasis',
  'Fascinacion',
  'Entusiasmo',
  'Esperanza'
];