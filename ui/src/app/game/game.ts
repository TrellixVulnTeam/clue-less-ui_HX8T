import {Player} from './player';

export class Game {
        
    id!: number;
    players!: Player[];

    constructor(public newGame: Game) {
        this.id = newGame.id;
        this.players = newGame.players;
    }
}