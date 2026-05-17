export interface RevealWordModel {
    fullWord: string,
    splittedWord: string[],
}

export interface GameStateModel {
    triesLeft: number,
    inGame: boolean,
    victory: boolean,
    totalScore?: number,
}

export interface SelectedKeyModel {
    key: string,
    correctLetter: boolean,
}
