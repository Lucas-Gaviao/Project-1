class Game {

    constructor(){

        this.player = null
        this.objectArr = [];

    }

    startGame(){

        this.player = new Player();
        this.attachEventListeners();

        setInterval(() => {
            const newAlien = new Objects();
            this.objectArr.push(newAlien);
        },800)
      
        setInterval(() =>{
          this.objectArr.forEach((alien) => {
            alien.moveDown();


            this.detectCollision(alien);

            this.deleteObject(alien);
          });  
        }, 100);
    }
    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowLeft" && this.player.positionX - this.player.playerSpeed >= 0){
                this.player.moveLeft();
            } else if(e.code === "ArrowRight" && this.player.positionX + this.player.playerSpeed <= 100){
                this.player.moveRight();
            } 
          })  
    }
    detectCollision(alien){
        if (alien.positionX < this.player.positionX + this.player.width &&
            alien.positionX + alien.width > this.player.positionX &&
            alien.positionY < this.player.positionY + this.player.height &&
            alien.height + alien.positionY > this.player.positionY) {
                location.href = "/game-over.html";
            } 
        }
    
    deleteObject(alien){
        if(alien.positionX < 0 - alien.height){
            //remove element from the dom;
            alien.DomEl.remove();
            //remove the element from the array;
            this.objectArr.shift();
        }
    }
}

class Player {

    constructor(){
        this.height = 10;
        this.width = 3;
        this.positionX = 50 - this.height / 2;
        this.positionY = 0
        this.playerSpeed = 3;

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

        const parent = document.getElementById("space");
        parent.appendChild(this.DomEl);
    }  
    
  /*  moveUp() {
        this.positionY += this.playerSpeed;
        this.DomEl.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY -= this.playerSpeed;
        this.DomEl.style.bottom = this.positionY + "vh"

    }
*/
    moveLeft() {
        if(this.positionX > 0 + this.width){
            this.positionX -= this.playerSpeed;
            this.DomEl.style.left = this.positionX + "vw";
        }
    }

    moveRight() {
        if(this.positionX <= 100 - this.width){
            this.positionX += this.playerSpeed;
            this.DomEl.style.left = this.positionX + "vw";
        } 
    }
}

class Objects {

    constructor(){
        this.height = 8;
        this.width = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width));
        this.positionY = 100;
        this.objectSpeed = 2;

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

        const parent = document.getElementById("space");
        parent.appendChild(this.DomEl);
        
    }

    moveDown() {
        this.positionY -= this.objectSpeed;
        this.DomEl.style.bottom = this.positionY + "vh"

    }
  
}

class PowerObj{
    constructor(){

    }
}   


const game = new Game();
game.startGame();

