class Vertex {
    constructor(x, y, number) {
        this.x = x;
        this.y = y;
        this.number = number;
        this.label = null;

        this.drawLabel();
        this.positionLabel();
    }

    drawLabel() {
        let label = createP(this.number);
        label.class('vertex');
        this.label = label;
    }

    positionLabel(label) {
        let posX = this.x + (width / 2) + (this.number >= 10 ? -3 : 3);
        let posY = this.y + (height / 2) - 20;
        this.label.position(posX, posY);
    }
}
