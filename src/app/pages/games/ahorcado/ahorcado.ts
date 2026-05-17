import { Component, computed, inject } from '@angular/core';
import { AhorcadoService } from '../services/ahorcado-service';

@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.scss',
})
export class Ahorcado {
  readonly ahorcadoService = inject(AhorcadoService);
  readonly keyboard: string[] = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ];

  readonly gameState = this.ahorcadoService.gameState;
  readonly wordToReveal = this.ahorcadoService.wordToReveal;
  readonly selectedKeys = this.ahorcadoService.selectedKeys;
  readonly revealedWord = this.ahorcadoService.revealedWord;

  readonly isPlaying = computed(() =>
    this.gameState().inGame &&
    !this.gameState().victory
  );

  readonly isGameOver = computed(() =>
    !this.gameState().victory &&
    this.gameState().triesLeft === 0
  );

  readonly showHangman = computed(() =>
    this.gameState().inGame ||
    this.gameState().triesLeft === 0
  );

  readonly hangmanParts = computed(() => {
    const tries = this.gameState().triesLeft;

    return {
      head: tries <= 5,
      torso: tries <= 4,
      leftArm: tries <= 3,
      rightArm: tries <= 2,
      leftLeg: tries <= 1,
      rightLeg: tries <= 0
    };

  });

  readonly selectedLettersMap = computed(() => {
    const map = new Map<string, 'success' | 'error'>();

    this.selectedKeys().forEach(key => {
      map.set(
        key.key,
        key.correctLetter ? 'success' : 'error'
      );
    });

    return map;
  });

  handleStartGame(): void {
    this.ahorcadoService.startNewGame();
  }

  handleSelectKey(key: string): void {
    this.ahorcadoService.addKey(key);
  }

  selectedLetterStyle(letter: string): string {
    return this.selectedLettersMap().get(letter) ?? '';
  }
}