import { ClueGameButton } from "./clue-game-button";

export class LocationButton extends ClueGameButton{
    public name:string | undefined;
    type:string | undefined;
    x:number | undefined;
    y:number | undefined;
    img_path:string | undefined;

    constructor(name:string = '', type:string = '', x:number = 0, y:number = 0, img_path:string = '/') {
        super();
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.img_path = img_path;
    }
    
}
