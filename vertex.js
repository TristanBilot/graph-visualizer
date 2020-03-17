class Vertex {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.label = null;
        this.ellipse = null;
        this.size = 0;

        this.calcEllipseSize();
        this.drawLabel();
        this.positionLabel();

    }

    drawLabel() {
        removeLabels();
        let label = createP(this.text);
        label.class('vertex');
        this.label = label;
        if (labels[this.text] == null)
            labels[this.text] = [];
        labels[this.text].push(label);
    }

    positionLabel(label) {
        let posX = width/2 + this.x + canvasPos.x + offset(this.text);
        let posY = height/2 + this.y + canvasPos.y - 13;
        this.label.position(posX, posY);
    }

    calcEllipseSize() {
        const base = 40;
        this.size = base + len(this.text) * 8;
    }
}

function len(text) {
    if (text == null) return 0;
    if (typeof text === 'string' || text instanceof String)
        return text.length;
    return text.toString().length;
}

function offset(text) {
    const delta = -5;
    const length = len(text);
    return length * delta;
}
