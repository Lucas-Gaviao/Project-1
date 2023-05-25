class Game {

    constructor(){

        this.player = null
        this.objectArr = [];
        this.bulletArr = [];
        this.score = 0;
    }

    startGame(){

        this.player = new Player();
        this.attachEventListeners();
        
        //Adjusting the volume;
        let music = document.getElementById("music");
        music.volume = 0.1;
        
        setInterval(() => {
            const newObject = new Objects();
            this.objectArr.push(newObject);
        },800)
      
        setInterval(() =>{
          this.objectArr.forEach((object, index) => {
            object.moveDown();
            this.detectCollision(object);
            this.deleteObject(object, index);

            this.bulletArr.forEach((bullet, indexBullet)=> {
                this.detectBulletCollision(object, bullet, index, indexBullet)
            })
          });  
        }, 100);

        setInterval(() =>{
            this.bulletArr.forEach((bullet) => {
            bullet.shootUp();
            this.deleteBullet(bullet); 
            })
        }, 50)        
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
                const newBullet = new Bullet(this.player.height, this.player.width, this.player.positionX, this.player.positionY);
                this.bulletArr.push(newBullet);   

                //console.log(this.bulletArr)
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

    detectBulletCollision(object, bullet, index, indexBullet){
        if (bullet.bulletX < object.positionX + object.width &&
            bullet.bulletX + bullet.width > object.positionX &&
            bullet.bulletY < object.positionY + object.height &&
            bullet.height + bullet.bulletY > object.positionY){
                object.health -= bullet.damage; 
                bullet.domElBullet.remove();
                this.bulletArr.splice(indexBullet, 1);

                if(object.health <= 0){
                    object.DomEl.remove();
                    this.objectArr.splice(index, 1);
                    this.score += 10;
                    
                    const showScore = document.getElementById("score")
                    showScore.textContent = `Score: ${this.score}`;
                        if(this.score === 400){
                         this.gameWinner();         
                    };
                }
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

    deleteBullet(bullet){

        if(bullet.bulletY > 100 + bullet.height){
            //remove element from the dom;
            bullet.domElBullet.remove();
            //remove the element from the array;
            this.bulletArr.shift(); 
        }
    }

    gameWinner(){
        
            location.href="../winner.html"
        
    }
}

class Player {

    constructor(){
        this.height = 8;
        this.width = 4.5;
        this.positionX = 50 - this.height / 2;
        this.positionY = 10
        this.playerSpeed = 4;

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
        this.height = 5.5;
        this.width = 5;
        this.positionX = Math.floor(Math.random() * (100 - this.width));
        this.positionY = 100;
        this.objectSpeed = 2;
        this.health = 6;

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
    constructor(height, width, positionX, positionY){
        this.height = 1.5;
        this.width = 0.2;
        this.bulletX = positionX + width / 2;
        this.bulletY = positionY + height;
        this.bulletSpeed = 4;
        this.damage = 7;

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

const game = new Game();
game.startGame();

