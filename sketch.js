import Asteroid from './classes/asteroids';
import Laser from './classes/laser';
import Ship from'./classes/ship';
import Dom from './classes/dom';
import './styles/main.css';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom.js';


export let pi5 = new p5();
export let shipImg;
let ship;
let asteroidMaterial;
let asteroids = [];
let lasers = [];
let asteroidSpawner;
let dom;
let body;
window.score = 1000;
window.html =  document.getElementsByTagName("HTML")[0];
window.isFirstGame = true;
window.gameState = false;
window.gameMode = 'easy';


export const sketch = function(pi5) {

    shipImg = loadImage('./images/ship.png');
    let scoreShower = createScoreShower();

pi5.setup = function() {
    let width = innerWidth;
    let height = innerHeight;
    body = document.getElementsByTagName('body')[0];
    body.style.marginTop = '0px';
    html.style.overflow = 'hidden';
    dom = new Dom();
    dom.deleteCanvas('defaultCanvas1');

    if(window.isFirstGame) {
        scoreShower.hide();
        dom.deleteCanvas('defaultCanvas0');
        dom.loadLandingPage();
        window.isFirstGame = false;
        return;
    }else {
        scoreShower.show();
        window.gameState = true;
        createCanvas(width, height);
    }


   ship = new Ship();

   for(let i = 0; i < 10; i++) {
       asteroids.push(new Asteroid());
   }

   asteroidSpawner = createAsteroidsSpawner();

}


pi5.draw = function() {
    frameRate(120);
    resizeCanvas(width, height);
    background('#030c1b');

    for(let i=0; i < asteroids.length; i++) {
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();


        if(!window.gameState) {
           continue;
        }   

        if(ship.hits(asteroids[i])) {
            scoreShower.hide();
            ship = null;
            gameState = false;
            clearInterval(asteroidSpawner);
            dom.createScoreBar();
        }

    }



    for(let i=0; i < lasers.length; i++) {
        lasers[i].render();
        lasers[i].update();


        for(let j = asteroids.length - 1; j >= 0; j--) {
            if(lasers[i].hits(asteroids[j])) { 
               let newAsteroids = asteroids[j].blowUp(lasers[i]);
               if(newAsteroids) {
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

    if(!gameState) {
         return;
      }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    scoreShower.html(window.score);
}

pi5.keyReleased = function() { 
    if(!gameState){
        return;
    }
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
        ship.setRoration(0);
    }else if(keyCode === UP_ARROW) {
        ship.movingForward(false);
    }else if(keyCode === DOWN_ARROW) {
        ship.movingBackward(false);
    }
}

window.keyPressed = function() {
    if(!gameState){
        return;
    }
    if(key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }else if(keyCode === RIGHT_ARROW) {
        ship.setRoration(0.1);
    }else if(keyCode === LEFT_ARROW) {
        ship.setRoration(-0.1);
    }else if(keyCode === UP_ARROW) {
        ship.movingForward(true);
        ship.movingBackward(false);
    }else if(keyCode === DOWN_ARROW) {
        ship.movingBackward(true);
        ship.movingForward(false);
    }
}

window.startGame = function() {
    dom.hideLandingPage();
    pi5.setup();
}

function createAsteroidsSpawner() {
    let spawnTime = setUpSpawnTime();
    return  setInterval(()=>asteroids.push(new Asteroid()), spawnTime);   
}

function setUpSpawnTime() {
    if(window.gameMode === 'easy') {
        return 7000;
    }else if(window.gameMode === 'medium') {
        return 4000;
    }else if(window.gameMode === 'hard') {
        return 2000;
    }else if(window.gameMode === 'rage') {
        return 1000;
    }
}

function createScoreShower() {
    let scoreShower = createElement('h1');
    scoreShower.class('score-shower');
    return scoreShower;
}

}


window.loadMenu = function() {
    dom.deleteCanvas('defaultCanvas0');
    dom.loadLandingPage();
}

window.deleteAsteroids = function() {
    asteroids.length = 0;
}

window.easyGameModeSetup = function() {
    window.gameMode = 'easy';
    dom.updateChoosedGameMode();
}

window.mediumGameModeSetup = function() {
    window.gameMode = 'medium';
    dom.updateChoosedGameMode();
}

window.hardGameModeSetup = function() {
    window.gameMode = 'hard';
    dom.updateChoosedGameMode();
}

window.rageGameModeSetup = function() {
    window.gameMode = 'rage';
    dom.updateChoosedGameMode();
}