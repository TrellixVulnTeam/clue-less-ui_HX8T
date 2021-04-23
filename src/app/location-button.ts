import { ClueGameButton } from "./clue-game-button";

export class LocationButton extends ClueGameButton{

    type:string | undefined;
    x:number | undefined;
    y:number | undefined;
    img_path:string | undefined;

    constructor(label:string = '', type:string = '', x:number = 0, y:number = 0, img_path:string = '/') {
        super(label);
        this.type = type;
        this.x = x;
        this.y = y;
        this.img_path = img_path;
    }
    
}
