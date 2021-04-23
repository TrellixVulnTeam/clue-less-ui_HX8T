export class ClueGameButton {

    // always start disabled
    disabled = true;

    enable() {
        this.disabled = false;
    }

    disable() {
        this.disabled = true;
    }
}
