export class Player {
        
    name!: string;
    id!: number;
    //position!: number[];
    isTurn!: boolean;

    constructor(public playerName: string, public playerId: number, public playerTurn: boolean) {
        this.setName(playerName);
        this.setId(playerId);
        //this.setPosition(playerPosition);
        this.setTurn(playerTurn);
    }
    
    setName(playerName: string) {
        this.name = playerName;
    }

    setId(playerId: number) {
        this.id = playerId;
    }

    // setPosition(playerPosition: number[]) {
    //     this.position = playerPosition;
    // }

    setTurn(playerTurn: boolean) {
        this.isTurn = playerTurn;
    }
}