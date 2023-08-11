import Vertex from "./Vertex.js";
import Level from "./Level.js";
import Game from "./Game.js";
import { red, green } from "./app.js";

let test_game = new Game();
//funkcje potrzebne z level: wszystko

function test_play(index) {
    vertices[index].changeColor(green);
    vertices[index].setIsClickedToTrue();
    let v = chooseVertexAlg();
    v.changeColor(red);
    v.setIsClickedToTrue();
}

function test(level_index) {
    //zmienna, która będzie mówić ile wygranych mamy
    let wonGames = 0;
    //tworzymy level zgodnie z klasą Level
    let graph = new Level(test_game.levels[level_index], test_game);
    //tworzymy graf i jego wierzchołki (kl.Vertex)
    for (let i=1; i<= graph.level.vertices.length; i++) {
        let itemDom = i;           //itemDom jest w tym przypadku nieistotny i będzie indeksem wierzchołka (1,2,..)
        const item = new Vertex(itemDom);
        graph.vertices.push(item);
    }
    //dodajemy sąsiadów do każdego wierzchołka grafu
    for (let i=0; i < graph.vertices.length; i++) { //dla każdego wierzchołka dodajemy sąsiadów
        for (let j=0; j < graph.level.vertices[i].length; j++) {
            graph.vertices[i].addNeighbours([graph.vertices[graph.level.vertices[i][j]]]);
        }
    }

    for (let i=0; i < graph.vertices.length; i++) {
        test_play(i);
        if (graph.checkIfMajorityColored() != false) {
            let unclicked = graph.getClickedVertices(false);
            for (let j=0; j < unclicked.length; j++) {
                test_play(j);
                if (graph.checkIfMajorityColored() != false) {
                    unclicked = graph.getClickedVertices(false);
                    for (let k=0; k < unclicked.length; k++) {
                        test_play(k);
                        if (graph.checkIfMajorityColored() != false) {
                            unclicked = graph.getClickedVertices(false);
                            for (let l=0; l < unclicked.length; l++) {
                                test_play(l);
                                if (graph.checkIfMajorityColored() != false) {
                                    unclicked = graph.getClickedVertices(false);
                                    for (let m=0; m < unclicked.length; m++) {
                                        test_play(m);
                                        if (graph.checkIfMajorityColored() != false) {
                                            unclicked = graph.getClickedVertices(false);
                                            for (let n=0; n < unclicked.length; n++) {
                                                test_play(n);
                                                if (graph.checkIfMajorityColored() != false) {
                                                    unclicked = graph.getClickedVertices(false);
                                                    for (let o=0; o < unclicked.length; o++) {
                                                        test_play(o);
                                                        if (graph.checkIfMajorityColored() != false) {
                                                            unclicked = graph.getClickedVertices(false);
                                                            for (let p=0; p < unclicked.length; p++) {
                                                                test_play(p);
                                                                if (graph.checkIfMajorityColored() != false) {
                                                                    unclicked = graph.getClickedVertices(false);
                                                                    for (let r=0; r < unclicked.length; r++) {
                                                                        test_play(r);
                                                                        if (graph.checkIfMajorityColored() != false) {
                                                                            wonGames += 1;
                                                                        }
                                                                    }
                                                            }
                                                            }
                                                    }
                                                    }
                                            }
                                            }
                                    }
                                    }
                            }
                            }
                    }
                    }
            }
        }
}  
} }
console.log(test(0));