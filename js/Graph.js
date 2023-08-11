import { red, green } from "./app.js";
export default class Graph {
    constructor(vertices) {
        this.vertices = vertices;
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
            const neighbours = item.neighbours.filter(i => i.color === item.color);
            if (neighbours.length > item.neighNumber / 2) {
                return false;
            }
        }
    }
    ChooseVertexAlg() {
        //najpierw szukamy nieklikniętego sąsiada czerwonego wierzchołka, który ma szansę jeszcze być nieszczęśliwy
        let redVertices = this.getColoredVertices(red);
        let sortedRedVertices = redVertices.sort((a, b) => a.neighNumber - b.neighNumber);
        for (let item of sortedRedVertices) {
            let greenNeighbours = item.neighbours.filter(i => i.color === green); //po to żeby przypadki nieoptymalne (czyli kolorowania sąsiadów tych co i tak będą happy)
            if (greenNeighbours.length < item.neighNumber/2) {
                let unclicked = item.neighbours.filter(j => j.isClicked == false);
                if (unclicked.length != 0) {
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
        console.log(unclickedAll);
        let sortedUnclikedAll = unclickedAll.sort((a,b) => a.neighNumber - b.neighNumber);
        return sortedUnclikedAll[0];
        }

    computerMove(){
        let vertex = this.ChooseVertexAlg() ;
        console.log(vertex);
        vertex.changeColor(red);
        vertex.setIsClickedToTrue();
        vertex.vertexDom.style.fill = red;
        if (this.checkIfMajorityColored() == false) {
            document.getElementById("welcome_msg").textContent = "GAME OVER";
            this.switchGameOver();
            const button = document.createElement('button');
            button.innerText = 'Try Again';
            button.id = 'tryAgain';
            button.addEventListener("click", () => {alert('So you want to try again, huh?')});
            document.body.appendChild(button);
        }
        else if (this.getClickedVertices(false).length > 0){ //tu do przemyslenia i warunek do zmodyfikowania
        }
        else {document.getElementById("welcome_msg").textContent =("You won! Congrats");
            const button = document.createElement('button');
            button.innerText = 'Next Level';
            button.id = 'nextBtn';
            button.addEventListener("click", () => {alert('Oh, you clicked me!')});
            document.body.appendChild(button);
}}
    playGame() {
        const graph = this;
        let verticesDom = [];
        let vertices = this.vertices;
        this.vertices.forEach(vertex => {verticesDom.push(vertex.vertexDom)});
        for (let [index, element] of verticesDom.entries()) {
            element.addEventListener("click",function() {
                if (!graph.isGameOver) {
                    if (vertices[index].isClicked == false) {
                        vertices[index].changeColor(green);
                        vertices[index].setIsClickedToTrue();
                        element.style.fill= green;
                        if (graph.checkIfMajorityColored() == false) {
                            document.getElementById("welcome_msg").textContent = "GAME OVER";
                            graph.switchGameOver();
                            const button = document.createElement('button');
                            button.innerText = 'Try Again';
                            button.id = 'tryAgain';
                            button.addEventListener("click", () => {alert('So you want to try again, huh?')}); //trzeba by było tu funkcję startgame odpalić
                            document.body.appendChild(button);
                        }
                        else if (graph.getClickedVertices(false).length > 0){
                            graph.computerMove();
                        }
                        else {document.getElementById("welcome_msg").textContent =("You won! Congrats");
                            const button = document.createElement('button');
                            button.innerText = 'Next Level';
                            button.id = 'nextBtn';
                            button.addEventListener("click", () => {alert('Oh, you clicked me!')});
                            document.body.appendChild(button);}
                    }
                }
    }
        )    
        }
    }
    stopGame() {        
        const graph = this;
        let verticesDom = [];
        let vertices = this.vertices;
        this.vertices.forEach(vertex => {verticesDom.push(vertex.vertexDom)});
        for (let [index, element] of verticesDom.entries()) {
            element.removeEventListener("click",function() {
                if (vertices[index].isClicked == false) {
                    vertices[index].changeColor(green);
                    vertices[index].setIsClickedToTrue();
                    element.style.fill= green;
                    if (graph.checkIfMajorityColored() == false) {
                        graph.isGameOver = true;
                        document.getElementById("welcome_msg").textContent = "GAME OVER";
                    }
                    else if (graph.getClickedVertices(false).length > 0){
                        graph.computerMove();
                    }
                    else {document.getElementById("welcome_msg").textContent =("You won! Congrats")};
                        graph.isGameOver = true;
                }}
        )    
        }

    }
}
