class Vertex {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.label = null;

        this.drawLabel();
        this.positionLabel();
    }

    drawLabel() {
        let label = createP(this.text);
        label.class('vertex');
        this.label = label;
    }

    positionLabel(label) {
        let posX = this.x + (width / 2) + ((windowWidth - width) / 2) + offset(this.text);
        let posY = this.y + (height / 2) - 30;
        this.label.position(posX, posY);
    }
}

function offset(text) {
    const delta = -5;
    if (typeof text === 'string' || text instanceof String)
        return text.length * delta;
    if (text == 0)
        return 1;
    
    var neg = false;
    var nb = 0;
    if (text < 0) {
        text *= -1;
        neg = true;
    }
    while (text > 0) {
        nb++;
        text = Math.floor(text / 10);
    }
    return neg ? (nb + 1) * delta : nb * delta;
}
