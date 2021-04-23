import { ClueGameButton } from "./clue-game-button";

export class LocationButton extends ClueGameButton{

    type:string;
    x:number;
    y:number;
    img_path:string;

    constructor(label:string = 'empty', type:string = '', x:number = 0, y:number = 0, img_path:string = '/') {
        super(label);
        this.type = type;
        this.x = x;
        this.y = y;
        this.img_path = img_path;
    }
    
}
