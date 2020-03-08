class Vertex {
    constructor(x, y, number) {
        this.x = x;
        this.y = y;
        this.number = number;

        this.drawLabel();
    }

    drawLabel() {
        let label = createP(this.number);
        label.class('vertex');
        label.position(x + (width/2) + 3, y + (height/2) - 20);
    }

}
