let shipImg;
let ship;
let asteroidMaterial;
let width = innerWidth;
let height = innerHeight;
let asteroids = [];
let lasers = [];
let score = 0;
let gameState = false;

function preload() {
    shipImg = loadImage('./images/ship.png');
}

function setup() {
    gameState = true;
   createCanvas(width, height);
   ship = new Ship();
   for(let i = 0; i < 10; i++){
    asteroids.push(new Asteroid());
   }

   let asteroidSpawner = setInterval(()=>asteroids.push(new Asteroid()), 10000);
}


function draw(){
    if(!gameState){
        return;
    }
    background('#030c1b');

    for(let i=0; i < asteroids.length; i++){
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();


        if(ship.hits(asteroids[i])){
            endGame();
            return;
        }

    }

    for(let i=0; i < lasers.length; i++){
        lasers[i].render();
        lasers[i].update();


        for(let j = asteroids.length - 1; j >= 0; j--){
            if(lasers[i].hits(asteroids[j])){
               let newAsteroids = asteroids[j].blowUp(lasers[i]);
               if(newAsteroids){
                asteroids = asteroids.concat(newAsteroids);
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                break;
               }
               lasers.splice(i, 1);
               break;
            }
            
        }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();


    let scoreContainer = createElement('div');
    createElement.class('score-container');
    let scoreElement = createElement('p');
    scoreElement.class('score');
    scoreElement.parent(scoreContainer);
}

function keyReleased(){
    if(!gameState){
        return;
    }
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
        ship.setRoration(0);
    }else if(keyCode === UP_ARROW){
        ship.movingForward(false);
    }else if(keyCode === DOWN_ARROW){
        ship.movingBackward(false);
    }
}

function keyPressed(){
    if(!gameState){
        return;
    }
    if(key == ' '){
        lasers.push(new Laser(ship.pos, ship.heading));
    }else if(keyCode === RIGHT_ARROW){
        ship.setRoration(0.1);
    }else if(keyCode === LEFT_ARROW){
        ship.setRoration(-0.1);
    }else if(keyCode === UP_ARROW){
        ship.movingForward(true);
        ship.movingBackward(false);
    }else if(keyCode === DOWN_ARROW){
        ship.movingBackward(true);
        ship.movingForward(false);
    }
}


function endGame(){
    ship = null;
    asteroids.length = 0;
    lasers.length = 0;
    gameState = false;
    noCanvas();
    giveScore();
}

function giveScore(){
    let scoreBar = createElement('div');
    scoreBar.class('score-bar');
}