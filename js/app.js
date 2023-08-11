import Game from "./Game.js";
import Level from "./Level.js";
import Vertex from "./Vertex.js";

export const green = "#6FFA6D"; //color used by user
export const red = "#FF3232"; //color used by a computer

const game = new Game();
document.getElementById("start").addEventListener("click",  () => {
    game.createLevel();
    document.querySelector(".level").style.display = "flex";
    const headerContainer = document.querySelector(".header-container");
    headerContainer.style.gridTemplateColumns = ".70fr .30fr";
    headerContainer.style.height = "100px";
    
});






