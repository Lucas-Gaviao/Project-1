class Game {

    constructor(){

        this.player = null
        this.objectArr = [];
        this.bulletArr = [];
    }

    startGame(){

        this.player = new Player();
        this.attachEventListeners();

        //Adjusting the volume;
        let music = document.getElementById("music");
        music.volume = 0.2;

        setInterval(() => {
            const newObject = new Objects();
            this.objectArr.push(newObject);
        },800)
      
        setInterval(() =>{
          this.objectArr.forEach((object) => {
            object.moveDown();
            this.detectCollision(object);
            this.deleteObject(object);
          });  
        }, 100);

        setInterval(() =>{
            this.bulletArr.forEach((singleBullet) => {
            singleBullet.shootUp();
            this.detectBulletCollision(singleBullet);
            this.deleteBullet(singleBullet);
            })
        }, 80)
    }


    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowLeft" && this.player.positionX - this.player.playerSpeed >= 0){
                this.player.moveLeft();  
            } else if(e.code === "ArrowRight" && this.player.positionX + this.player.playerSpeed <= 100){
                this.player.moveRight();   
            } else if(e.code === "ArrowUp" && this.player.positionY - this.player.playerSpeed <= 100){
                this.player.moveUp();
            } else if(e.code === "ArrowDown" && this.player.positionY - this.player.playerSpeed >= 0){
                this.player.moveDown();     
            } else if(e.code === "Space"){
                const newBullet = new Bullet(this.player.positionX, this.player.positionY);
                this.bulletArr.push(newBullet);    
            }
          })  
    }
    detectCollision(object){
        if (object.positionX < this.player.positionX + this.player.width &&
            object.positionX + object.width > this.player.positionX &&
            object.positionY < this.player.positionY + this.player.height &&
            object.height + object.positionY > this.player.positionY) {
                location.href = "../game-over.html";
            } 
    }

    detectBulletCollision(singleBullet, object){
        if (object.positionX < singleBullet.positionX + singleBullet.width &&
            object.positionX + object.width > singleBullet.positionX &&
            object.positionY < singleBullet.positionY + singleBullet.height &&
            object.height + object.positionY > singleBullet.positionY) {
                
            } 
    }
    
    deleteObject(object){

        if(object.positionY < 0 - object.height){
            //remove element from the dom;
            object.DomEl.remove();
            //remove the element from the array;
            this.objectArr.shift();   
        }
    }

    deleteBullet(singleBullet){

        if(singleBullet.positionY < 0 - singleBullet.height){
            //remove element from the dom;
            singleBullet.domElBullet.remove();
            //remove the element from the array;
            this.bulletArr.shift();   
        }
    }
}

class Player {

    constructor(){
        this.height = 8;
        this.width = 8;
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
        if(this.positionY + this.playerSpeed < 100)
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

class Bullet {
    constructor(positionX, positionY){
        this.height = 1;
        this.width = 0.3;
        this.bulletX = positionX;
        this.bulletY = positionY;
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
        this.domElBullet.style.bottom = this.bulletY + "vh";
    }

}   


//Adjusting the volume;
let audio = document.getElementById("music");
audio.volume = 0.2;

const game = new Game();
game.startGame();

