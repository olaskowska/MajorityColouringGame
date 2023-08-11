export default class Vertex {
    constructor(vertexDom) {
        this.vertexDom = vertexDom;
        this.color = "#D9D9D9";
        this.neighbours = [];
        this.neighNumber = 0; 
        this.isClicked = false;
    }
    addNeighbours(vertices) {
        this.neighbours = [...this.neighbours, ...vertices];
        this.neighNumber = this.neighbours.length;
    }
    setIsClickedToTrue() {
        this.isClicked = true;
    }
    changeColor(color) {
        this.color = color;
    }
    countNeighboursColored(color) {
        let neighboursColored = this.neighbours.filter(neighbour => neighbour.color === color);
        return neighboursColored.length;
    }
}