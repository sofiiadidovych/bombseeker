//Represents one field of a board
class Field {
    constructor() {
        const bombProbability = 0.5;
        this.hasBomb = Math.random() < bombProbability;
        //Number of bombs in the neighbour fields
        this.bombs = 0;
        this.isOpen = false;
        this.hasFlag = false;
    }
}
