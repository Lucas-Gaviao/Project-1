class Game {

    constructor(){
        this.player = null


    }

    startGame(){

        this.player = new Player();
        this.attachEventListeners();
    }

    attachEventListeners() {
            //attach  addEventListener =>
        document.addEventListener("keydown", (event) => {

            if(event.code === "ArrowLeft"){
                this.player.moveLeft();
            } else if(event.code === "ArrowRight"){
                this.player.moveRight();
            } else if(event.code === "ArrowUp"){
                this.player.moveUp();
            } else if(event.code === "ArrowDown"){
                this.player.moveDown();
            }
          })
        
    }    
}

class Player {

    constructor(){
        this.height = 10;
        this.width = 3;
        this.positionX = 0
        this.positionY = 50 - this.height / 2;

        this.DomEl = null;

        this.createDomElement()
    }
    createDomElement(){
        //created a div element to store the player;
        this.DomEl = document.createElement("div");
        this.DomEl.id = "player";

        this.DomEl.style.height = this.height + "vh";
        this.DomEl.style.width = this.width + "vw";
        this.DomEl.style.left = this.positionX + "vw";
        this.DomEl.style.bottom = this.positionY + "vh";

        const parent = document.getElementById("board");
        parent.appendChild(this.DomEl);
    }  
    
    moveUp() {
        this.positionY += 2;
        this.DomEl.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY -=2;
        this.DomEl.style.bottom = this.positionY + "vh"

    }

    moveLeft() {
        this.positionX -=2;
        if(this.positionX >= 0){
            this.DomEl.style.left = this.positionX + "vh";
        }
    }

    moveRight() {
        this.positionX += 2;
        if(this.positionX >= 0 && this.positionX < 100){
            this.DomEl.style.left = this.positionX + "vh";
        } else {
            this.positionX = 0;
        }
    }
}

class Objects {

    constructor(){
        this.height = 15
        this.width = 5
        this.positionX = 100
        this.positionY = 50 - this.height / 2

        this.DomEl = null;

        this.createDomElement();

    }

    createDomElement(){
        this.DomEl = document.createElement("div");
        this.DomEl.id = "object";

        this.DomEl.style.height = this.height + "vh";
        this.DomEl.style.width = this.width + "vw";
        this.DomEl.style.left = this.positionX + "vw";
        this.DomEl.style.bottom = this.positionY + "vh";

        const parent = document.getElementById("board");
        parent.appendChild(this.DomEl);
        
    }

    moveLeft(){

    }
}



const player1 = new Player(); 

player1.createDomElement();