import Vertex from "./Vertex.js";
import { red, green } from "./app.js";
export default class Level{
    constructor(level, game) {
        this.level = level; //obiekt z game.js
        this.game = game;
        this.vertices = [];
        this.isGameOver = false;
    }
    switchGameOver() {
        this.isGameOver = true;
    }
    getClickedVertices(boolean) {
        return this.vertices.filter(vert => vert.isClicked === boolean);
    }
    sortVerticesByNeighNumber() {
        return this.vertices.sort((a, b) => a.neighNumber - b.neighNumber);
    }
    getColoredVertices(color) { //returns an array of vertices in a specified color 
        return this.vertices.filter(vert => vert.color === color);
    }
    checkIfMajorityColored() {
        let clickedVertices = this.getClickedVertices(true);
        for (let item of clickedVertices) {
            const neighbours = item.neighbours.filter(i => i.color === item.color); //tu powinno być sprawdzane tylko czy jest happy czy nie
            if (neighbours.length > item.neighNumber / 2) {
                return false;
            }
        }
    }
    chooseVertexAlg() {
        //najpierw szukamy nieklikniętego sąsiada czerwonego wierzchołka, który ma szansę jeszcze być nieszczęśliwy
        let redVertices = this.getColoredVertices(red);
        let sortedRedVertices = redVertices.sort((a, b) => a.neighNumber - b.neighNumber);
        let unclickedWithNoGreenNeigh = [];
        for (let item of sortedRedVertices) {
            let greenNeighbours = item.neighbours.filter(i => i.color === green); //po to żeby przypadki nieoptymalne (czyli kolorowania sąsiadów tych co i tak będą happy)
            if (greenNeighbours.length < item.neighNumber/2) {
                let unclicked = item.neighbours.filter(j => j.isClicked == false);
                for (let vertex of unclicked) {
                    if (vertex.neighbours.filter(v => v.color === green).length === 0) {
                        unclickedWithNoGreenNeigh.push(vertex)
                    }
                }
                if (unclickedWithNoGreenNeigh != 0) {
                    return unclickedWithNoGreenNeigh[0];
                }
                else if (unclicked.length != 0) {
                    return unclicked[0];
                }
            }
        }
        //Jeśli nie ma wierzchołka spełniającego powyższe kryteria, to wybierz niekliknietego sąsiada wierzchołka będącego nieklikniętym sąsiadem zielonego wierzchołka.
        let greenVertices = this.getColoredVertices(green);
        let sortedGreenVertices = greenVertices.sort((a,b) => a.neighNumber - b.neighNumber);
        let withNonGreenNeighNeigh = [];
        for (let element of sortedGreenVertices) {
            let unclickedNeighbours = element.neighbours.filter(e => e.isClicked == false);
            for (let vertex of unclickedNeighbours) {
                let unclickedNeighOfNeigh = vertex.neighbours.filter(v => v.isClicked == false);
                for (let vert of unclickedNeighOfNeigh) {
                    if (vert.neighbours.filter(k => k.color === green).length === 0) {
                        withNonGreenNeighNeigh.push(vert)
                    }
                }
                if (withNonGreenNeighNeigh.length > 0) {
                    return withNonGreenNeighNeigh[0];
                }                
            }
        }
        let unclickedAll = this.getClickedVertices(false);
        let sortedUnclikedAll = unclickedAll.sort((a,b) => a.neighNumber - b.neighNumber);
        return sortedUnclikedAll[0];
        }

    computerMove(){
        let vertex = this.chooseVertexAlg() ;
        vertex.changeColor(red);
        vertex.setIsClickedToTrue();
        vertex.vertexDom.style.fill = red;
        if (this.checkIfMajorityColored() == false) {
            this.switchGameOver();
            this.game.switchToLooserMode() 
        }
        else if (this.getClickedVertices(false).length > 0){ //tu do przemyslenia i warunek do zmodyfikowania
        }
        else {
            this.game.switchToWinnerMode();
        }
    }
    playGame() {
        const level = this;
        const game = this.game;
        let verticesDom = [];
        let vertices = this.vertices;
        this.vertices.forEach(vertex => {verticesDom.push(vertex.vertexDom)});
        for (let [index, element] of verticesDom.entries()) {
            element.addEventListener("click",function() {
                if (!level.isGameOver) {
                    if (vertices[index].isClicked == false) {
                        vertices[index].changeColor(green);
                        vertices[index].setIsClickedToTrue();
                        element.style.fill= green;
                        if (level.checkIfMajorityColored() == false) {
                            level.switchGameOver();
                            game.switchToLooserMode();
                        }
                        else if (level.getClickedVertices(false).length > 0){
                            level.computerMove();
                        }
                        else {
                            game.switchToWinnerMode();
                        }
                    }
                } }
            )    
        }
    }
    initLevel() { //funkcja tworząca graf
        document.getElementById("welcome_msg").style.display = "none";
        const svg = document.querySelector(".container");
        svg.innerHTML = this.level.svg;
        for (let i=1; i<= this.level.vertices.length; i++) {
            let itemDom = document.getElementById(`Ellipse ${i}`);            
            const item = new Vertex(itemDom);
            this.vertices.push(item); //utworzyliśmy wierzchołki grafu oraz obiekt DOM dla każdego z tych wierzchołków
        }
        for (let i=0; i < this.vertices.length; i++) { //dla każdego wierzchołka dodajemy sąsiadów
            for (let j=0; j < this.level.vertices[i].length; j++) {
                this.vertices[i].addNeighbours([this.vertices[this.level.vertices[i][j]]]);
            }
        }
    }
    testLevel(index) { //funkcja testująca 

    }
}
