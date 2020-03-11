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
        let posX = this.x + (width / 2) + ((windowWidth - width) / 2) + offset(this.number);
        let posY = this.y + (height / 2) - 30;
        this.label.position(posX, posY);
    }
}

function offset(number) {
    const delta = -5;
    switch (true) {
    case number < 10:
        return delta;
    case number >= 10:
        return (2 * delta);
    case number >= 100:
        return (3 * delta);
    }
}
