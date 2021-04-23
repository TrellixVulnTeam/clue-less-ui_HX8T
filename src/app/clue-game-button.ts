export class ClueGameButton {

    // always start disabled
    label:string | undefined;
    disabled:boolean | undefined

    constructor(label:string) {
        this.label = label;
        this.disabled = true; // always start disabled
    }

    enable() {
        this.disabled = false;
    }

    disable() {
        this.disabled = true;
    }
}
