class Game {

    constructor(){

        this.player = null
        this.objectArr = [];
    }

    startGame(){

        this.player = new Player();
        this.attachEventListeners();
        this.object = new Objects();

        setInterval(() => {
            
            this.objectArr.push(object);
        },800)
      
        setInterval(() =>{
          this.objectArr.forEach((object) => {
            object.moveDown();
            this.detectCollision(object);
            this.deleteObject(object);
          });  
        }, 100);
    }

    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowLeft" && this.player.positionX - this.player.playerSpeed >= 0){
                this.player.moveLeft();
                this.detectCollision();
            } else if(e.code === "ArrowRight" && this.player.positionX + this.player.playerSpeed <= 100){
                this.player.moveRight();
                this.detectCollision();
            } else if(e.code === "ArrowUp" && this.player.positionY - this.player.playerSpeed <= 100){
                this.player.moveUp();
                this.detectCollision();
            } else if(e.code === "ArrowDown" && this.player.positionY - this.player.playerSpeed >= 0){
                this.player.moveDown();
                this.detectCollision();
            } else if(e.code === "SpaceBar"){
                this.bullet.shootUp();
                alert(e.code)
            }
          })  
    }
    detectCollision(object){
        
        if (this.object.positionX < this.player.positionX + this.player.width &&
            object.positionX + object.width > this.player.positionX &&
            object.positionY < this.player.positionY + this.player.height &&
            object.height + object.positionY > this.player.positionY) {
                location.href = "/game-over.html";
            } 
    }
    
    deleteObject(object){
        if(object.positionX < 0 - object.height){
            //remove element from the dom;
            object.DomEl.remove();
            //remove the element from the array;
            this.objectArr.shift();
        }
    }
}

class Player {

    constructor(){
        this.height = 3;
        this.width = 3;
        this.positionX = 50 - this.height / 2;
        this.positionY = 10
        this.playerSpeed = 2;

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
    
    moveUp() {
        this.positionY += this.playerSpeed;
        this.DomEl.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY -= this.playerSpeed;
        this.DomEl.style.bottom = this.positionY + "vh"

    }

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
        this.height = 4;
        this.width = 8;
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

class Bullet extends Game {
    constructor(){
        this.height = 1;
        this.width = 1;
        this.bulletX = this.player.positionX;
        this.bulletY = this.player.positionY;
        this.bulletSpeed = 2;

        this.domElBullet = null;

        this.createDomElement();
    }

    createDomElement(){

        this.domElBullet = document.createElement("div");
        this.domElBullet.id = "bullet";

        this.domElBullet.style.height = this.height + "vh";
        this.domElBullet.style.width = this.width + "vw";
        this.domElBullet.style.left = this.bulletX + "vw";
        this.domElBullet.style.bottom = this.bulletY + "vh";

        const parentEl = document.getElementById("space");
        parentEl.appendChild(this.domElBullet);
    }

    shootUp(){
        this.bulletY += this.bulletSpeed;
        this.domElBullet.style.bottom = this.bulletY + "vh"
    }

}   


const game = new Game();
game.startGame();

