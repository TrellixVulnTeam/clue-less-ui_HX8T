class Player {

    name: string = "DUMMY NAME";
    id: number = 0;
    position: number[] = [0,0];

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