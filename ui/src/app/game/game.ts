import {Player} from './player';

export class Game {
        
    gameId!: number;
    players!: Player[];
    hasStarted!: boolean;

    constructor(public newGame: Game) {
        this.gameId = newGame.gameId;
        this.players = newGame.players;
        this.hasStarted = newGame.hasStarted;
    }
}