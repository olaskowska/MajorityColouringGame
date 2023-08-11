import Level from "./Level.js";
import { svg0, svg1, svg2, svg3, svg4} from "./graphics.js";

export default class Game{
    constructor(){
        this.levels = [{level: 0, vertices: [[1,5], [0,2,3,5], [1,3], [1,2,4,5], [3,5], [0,1,3,4]], svg: svg0},
                        {level: 1, vertices: [[1,5,6,7], [0,2,7], [1,3], [2,4,6,7], [3,5], [0,4,6], [0,3,5], [0,1,3]], svg:svg1},
                        {level: 2, vertices: [[1,2,3,8], [0,3,4], [0,3,7,8], [0,1,2,4,5,7], [1,3,5], [3,4,6,7,9], [5,6,7,9], [2,3,5,6,8,9], [0,2,7,9], [5,6,7,8]], svg: svg2},
                        {level: 3, vertices: [[1,4,10,11], [0,2,4,11], [1,5,8,11,12,13], [6,7,8], [0,1,9,10], [2,6,12], [3,5,7,12], [3,6,8,9,15], [2,3,7,9,12], [4,7,8,10,13,14,15], [0,4,9,14], [0,1,2], [2,5,6,8], [2,9], [9,10,15], [7,9,14]], svg: svg3},
                        {level: 0, vertices: [[2,3], [2,4], [0,1,7,8], [0,5,6], [1,9,10], [3,11,14], [3,12,14], [2,12,13], [2,13,15], [4,15,16], [4,16,17], [5], [6,7], [7,8], [5,6], [8,9], [9,10], [10]], svg: svg4} 
                        ];
        this.currentLevel = 0;
    }
    switchToNextLevel() {
        this.currentLevel += 1;
    }
    createButtonWithText(text) {
        const game = this;
        const button = document.createElement('button');
        button.innerText = text;
        button.id = "temp_button";
        button.classList.add("button");
        button.addEventListener("click", () => game.createLevel());
        document.body.appendChild(button);
    }
    switchToWinnerMode() {
        document.getElementById("header").textContent =("Congrats, you won!");
        this.switchToNextLevel(); 
        this.createButtonWithText("Next Level");
    }
    switchToLooserMode(){
        document.getElementById("header").textContent =("Game Over!");
        this.createButtonWithText("Try Again");
    }
    createLevel() {
        const level = new Level(this.levels[this.currentLevel], this);
        document.getElementById("header").textContent =("Majority Colouring Game");
        document.getElementById(`dot${this.currentLevel+1}`).classList.add("active");
        level.initLevel();
        level.playGame();
        if (document.getElementById("temp_button") == null) {
            document.getElementById("start").remove()
        }
        else {document.getElementById("temp_button").remove()}

    }
}