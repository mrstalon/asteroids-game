/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_asteroids__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_laser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_ship__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_dom__ = __webpack_require__(4);






let shipImg;
let ship;
let asteroidMaterial;
let width = innerWidth;
let height = innerHeight;
let asteroids = [];
let lasers = [];
let score = 1000;
let gameState = false;
let asteroidSpawner;
let dom;
let html;
let body;


function preload() {
    shipImg = loadImage('./images/ship.png');
}

function setup() {
    body = document.getElementsByTagName('body')[0];
    html = document.getElementsByTagName("HTML")[0];
    html.style.overflow = 'hidden';

   gameState = true;
   createCanvas(innerWidth, innerHeight);
   ship = new __WEBPACK_IMPORTED_MODULE_2__classes_ship__["a" /* Ship */]();
   dom = new __WEBPACK_IMPORTED_MODULE_3__classes_dom__["a" /* Dom */]();
   for(let i = 0; i < 10; i++){
      asteroids.push(new __WEBPACK_IMPORTED_MODULE_0__classes_asteroids__["a" /* Asteroid */]());
   }

   let scoreContainer = createElement('div');
   scoreContainer.class('score-container');
   let scoreElement = createElement('p');
   scoreElement.class('score');
   scoreElement.parent(scoreContainer);

   asteroidSpawner = setInterval(()=>asteroids.push(new __WEBPACK_IMPORTED_MODULE_0__classes_asteroids__["a" /* Asteroid */]()), 10000);
}


function draw(){

    background('#030c1b');

    for(let i=0; i < asteroids.length; i++){
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();


        if(!gameState){
           continue;
        }   

        if(ship.hits(asteroids[i])){
            ship = null;
            gameState = false;
            clearInterval(asteroidSpawner);
            dom.createScoreBar();
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

    if(!gameState){
         return;
      }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();



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
        lasers.push(new __WEBPACK_IMPORTED_MODULE_1__classes_laser__["a" /* Laser */](ship.pos, ship.heading));
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


function endGame() {
    ship = null;
    asteroids.length = 0;
    lasers.length = 0;
    gameState = false;
    noCanvas();
}

function startGame() {
    dom.hideLandingPage();
    body.style.marginTop = '-15px';
    setup();
}

function clearGame() {
    asteroids.length = 0;
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Asteroid;
function Asteroid(position, radious){

    if(position){
        this.pos = position.copy();
        this.radious = floor(random(20,radious/2));
        this.total = floor(random(5,7));
        this.offset = [];
        this.healthPoints = 1;

        for(let i = 0; i < this.total; i++){
            this.offset.push(floor(random(-2,2)));
        }
    }else {
        let randomPos = floor(random(2));
        if(randomPos == 1) {
            this.pos = createVector(width, random(height));
        }else {
            this.pos = createVector(random(width), height);
        }

        this.radious = floor(random(35,70));

        if(this.radious >55){
            this.healthPoints = floor(random(5,7));
        }else{
            this.healthPoints = floor(random(2,4));
        }

        this.total = floor(random(5,10));
        this.offset = [];

        for(let i = 0; i < this.total; i++){
            this.offset.push(floor(random(-5,5)));
        }
    }


    this.velocity = p5.Vector.random2D();
    this.velocity.mult(2);


}

Asteroid.prototype.render = function(){
    push();
    translate(this.pos.x,this.pos.y);
    stroke('#333333');
    fill('#333333');
    beginShape();
    for(let i = 0; i < this.total; i++){
        let angle = map(i, 0, this.total, 0, TWO_PI);
        let localRadious = this.radious + this.offset[i];
        let x = localRadious*cos(angle);
        let y = localRadious*sin(angle);
        vertex(x,y);
    }
    endShape(CLOSE);

    pop();
}

Asteroid.prototype.update = function(){
    this.pos.add(this.velocity);
}

Asteroid.prototype.edges = function(){
    if(this.pos.x > width + this.radious){
        this.pos.x = -this.radious;
    }else if(this.pos.x < -this.radious){
        this.pos.x = width + this.radious;
    }else if(this.pos.y > height + this.radious){
        this.pos.y = -this.radious;
    }else if(this.pos.y < -this.radious){
        this.pos.y = height + this.radious;
    }
}

Asteroid.prototype.blowUp = function(laser){
    --this.healthPoints;
    if(this.healthPoints <= 0){
        score += 100;
        let newAsteroids = [];
        
            if(this.radious < 25){
                return newAsteroids;
            }
        
            newAsteroids.push(new Asteroid(laser.pos, this.radious));
            newAsteroids.push(new Asteroid(laser.pos, this.radious));
            return newAsteroids;
    }else{
        return false;
    }

}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Laser;
function Laser(shipPosition, shootDirection){
    this.pos = createVector(shipPosition.x, shipPosition.y);
    this.velocity = p5.Vector.fromAngle(shootDirection);
    this.velocity.mult(10);

}

Laser.prototype.update = function(){
    this.pos.add(this.velocity);
}

Laser.prototype.render = function(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
}

Laser.prototype.hits = function(asteroid){
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    
    if(distance < asteroid.radious){
        return true;
    }else{
        return false;
    }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Ship;
function Ship(){
        this.pos = createVector(width/2, height/2);
        this.heading = 0;
        this.rotation = 0;
        this.velocity = createVector(0, 0);
        this.isMovingForward = false;
        this.isMovingBackward = false;
}

Ship.prototype.movingForward = function(isMovingForward){
    this.isMovingForward = isMovingForward;
}

Ship.prototype.movingBackward = function(isMovingBackward){
    this.isMovingBackward = isMovingBackward;
}

Ship.prototype.update = function(){
    if(this.isMovingForward){
        this.move();
    }else if(this.isMovingBackward){
        this.move(-PI);
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.85);
}

Ship.prototype.move = function(direction = 0){
    let force = p5.Vector.fromAngle(this.heading+direction);
    this.velocity.add(force);
}

Ship.prototype.render = function(){
    push();
    translate(this.pos.x, this.pos.y); 
    rotate(this.heading + PI / 2);
    imageMode(CENTER);
    image(shipImg,0,0);
    pop();
}

Ship.prototype.setRoration = function(angle){
    this.rotation = angle;
}

Ship.prototype.edges = function(){
    if(this.pos.x > width + shipImg.width){
        this.pos.x = -shipImg.width;
    }else if(this.pos.x < -shipImg.width){
        this.pos.x = width + shipImg.width;
    }else if(this.pos.y > height + shipImg.height){
        this.pos.y = -shipImg.height;
    }else if(this.pos.y < -shipImg.height){
        this.pos.y = height + shipImg.height;
    }
}


Ship.prototype.turn = function(){
    this.heading += this.rotation;
}


Ship.prototype.hits = function(asteroid){
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);

    if(distance < asteroid.radious+15){
        return true;
    }else{
        return false;
    }
}





/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Dom;
function Dom(){

}

Dom.prototype.createScoreBar = function (){
    this.scoreBar = createElement('div');
    this.scoreBar.class('score-bar');

    this.deadIndicator = createElement('h1');
    this.deadIndicator.class('dead-indicator');
    this.deadIndicator.html('YOU ARE DEAD');
    this.deadIndicator.parent(this.scoreBar);

    this.scoreIndicator = createElement('p');
    this.scoreIndicator.html('Your score is ' + score);
    this.scoreIndicator.class('score-indicator');
    this.scoreIndicator.parent(this.scoreBar);

    this.menuButton = createElement('button');
    this.menuButton.class('menu-button');
    this.menuButton.parent(this.scoreBar);
    this.menuButton.html('Back to menu');
    this.menuButton.attribute('onclick', 'dom.loadLandingPage()');
}

Dom.prototype.loadLandingPage = function(){
    clearGame();

    this.removeScoreBar();

    this.setupPlayMenu();

    this.setupControlsInformation();

    this.setupAboutGameInformation();

    this.setupAboutDeveloperInformation();

}

Dom.prototype.removeScoreBar = function() {
    html = document.getElementsByTagName("HTML")[0];
    html.style.overflow = 'scroll';
    this.scoreBar.remove();
    this.deadIndicator.remove();
    this.scoreIndicator.remove();
    this.menuButton.remove();
    noCanvas();
}

Dom.prototype.setupPlayMenu = function() {
    this.main = createElement('main');
    
    this.playMenu = createElement('div');
    this.playMenu.class('play-menu');
    this.playMenu.parent(this.main);
    
    this.gameName = createElement('h1');
    this.gameName.class('game-name');
    this.gameName.html('ASTEROIDS');
    this.gameName.parent(this.playMenu);
        
    this.playButton = createElement('button');
    this.playButton.class('play-button');
    this.playButton.attribute('onclick', 'startGame()');
    this.playButton.html('PLAY');
    this.playButton.parent(this.playMenu);
}

Dom.prototype.setupControlsInformation = function() {
    this.controlsContainer = createElement('div');
    this.controlsContainer.class('controls-container');
    this.controlsContainer.parent(this.main);

    this.controlsName = createElement('h1');
    this.controlsName.class('contorls-name');
    this.controlsName.html('CONTROLS');
    this.controlsName.parent(this.controlsContainer);

    this.container = createElement('div');
    this.container.class('container');
    this.container.parent(this.controlsContainer);

    this.setupArrowsControls();
    this.setupSpacebarControls();

  
}

Dom.prototype.setupArrowsControls = function(){
    this.controlsArrows = createElement('div');
    this.controlsArrows.class('controls-arrows');
    this.controlsArrows.parent(this.container);

    this.arrowsImage = createElement('img');
    this.arrowsImage.class('arrows-img');
    this.arrowsImage.attribute('src', '../images/controls-arrows.png');
    this.arrowsImage.parent(this.controlsArrows);
    
    this.arrowsInfo = createElement('p');
    this.arrowsInfo.class('arrows-info');
    this.arrowsInfo.html('Movement are controlled with this buttons');
    this.arrowsInfo.parent(this.controlsArrows);
}

Dom.prototype.setupSpacebarControls = function() {
    this.controlsSpacebar = createElement('div');
    this.controlsSpacebar.class('controls-spacebar');
    this.controlsSpacebar.parent(this.container);

    this.spacebarImage = createElement('img');
    this.spacebarImage.class('spacebar-img');
    this.spacebarImage.attribute('src', '../images/controls-spacebar.jpg');
    this.spacebarImage.parent(this.controlsSpacebar);

    this.spacebarInfo = createElement('p');
    this.spacebarInfo.class('spacebar-info');
    this.spacebarInfo.html('To make "PEW PEW" press spacebar');
    this.spacebarInfo.parent(this.controlsSpacebar);
}

Dom.prototype.setupAboutGameInformation = function() {
    this.setupAboutContainer();
    this.setupScreenshots();
    this.setupAboutText();
}

Dom.prototype.setupAboutContainer = function() {
    this.aboutContainer = createElement('div');
    this.aboutContainer.class('about-container');
    this.aboutContainer.parent(this.main);

    this.aboutName = createElement('h1');
    this.aboutName.html('ABOUT');
    this.aboutName.class('about-name');
    this.aboutName.parent(this.aboutContainer);

}

Dom.prototype.setupScreenshots = function() {
    this.screenshotsContainer = createElement('div');
    this.screenshotsContainer.class('screenshots-container');
    this.screenshotsContainer.parent(this.aboutContainer);

    this.firstScreenshot = createElement('img');
    this.firstScreenshot.attribute('src','../images/screenshot_01.png');
    this.firstScreenshot.class('first-screenshot');
    this.firstScreenshot.parent(this.screenshotsContainer);

    this.secondScreenshot = createElement('img');
    this.secondScreenshot.attribute('src', '../images/screenshot_02.png');
    this.secondScreenshot.class('second-screenshot');
    this.secondScreenshot.parent(this.screenshotsContainer);
}

Dom.prototype.setupAboutText = function() {
    this.aboutInfo = createElement('p');
    this.aboutInfo.html('Asteroids is an arcade space shooter released in November 1979. The object of the game is to shoot and destroy as much asteroids as you can. The game has only one level with constantly increasing difficulty.');
    this.aboutInfo.class('about-info');
    this.aboutInfo.parent(this.aboutContainer);
}

Dom.prototype.setupAboutDeveloperInformation = function() {
    this.devInfoContainer = createElement('div');
    this.devInfoContainer.class('dev-info-container');
    this.devInfoContainer.parent(this.main);

    this.devHeading = createElement('h1');
    this.devHeading.class('dev-heading');
    this.devHeading.html('DEVELOPER');
    this.devHeading.parent(this.devInfoContainer);

    this.devImage = createElement('img');
    this.devImage.attribute('src', '../images/Developer.jpg');
    this.devImage.class('dev-img');
    this.devImage.parent(this.devInfoContainer);

    this.devName = createElement('a');
    this.devName.class('dev-name');
    this.devName.attribute('href', 'https://github.com/mrstalon');
    this.devName.html('Artem Zekov');
    this.devName.parent(this.devInfoContainer);

    this.devInfo = createElement('p');
    this.devInfo.class('dev-info');
    this.devInfo.html('Sixteen years old programmer, who likes facing new and new difficulties while exploring the huge world of programming.');
    this.devInfo.parent(this.devInfoContainer);

}

Dom.prototype.hideLandingPage = function(){
    this.main.remove();
}

/***/ })
/******/ ]);