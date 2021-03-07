export class Player {
        
    name!: string;
    id!: number;
    position!: number[];

    constructor(public playerName: string, public playerId: number, public playerPosition: number[]) {
        this.setName(playerName);
        this.setId(playerId);
        this.setPosition(playerPosition);
    }
    
    setName(playerName: string) {
        this.name = playerName;
    }

    setId(playerId: number) {
        this.id = playerId;
    }

    setPosition(playerPosition: number[]) {
        this.position = playerPosition;
    }
}