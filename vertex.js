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
    if (number == 0)
        return 1;
    var neg = false;
    var nb = 0;
    const delta = -5;

    if (number < 0) {
        number *= -1;
        neg = true;
    }
    while (number > 0) {
        nb++;
        number = Math.floor(number / 10);
    }
    return neg ? (nb + 1) * delta : nb * delta;
}
