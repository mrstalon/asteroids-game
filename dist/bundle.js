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
/******/ 	__webpack_require__.p = "/dist";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_asteroids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__classes_asteroids__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_laser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_laser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__classes_laser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_ship__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_ship___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__classes_ship__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__classes_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_main_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_main_css__);







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
   ship = new Ship();
   dom = new Dom();
   for(let i = 0; i < 10; i++){
      asteroids.push(new Asteroid());
   }

   let scoreContainer = createElement('div');
   scoreContainer.class('score-container');
   let scoreElement = createElement('p');
   scoreElement.class('score');
   scoreElement.parent(scoreContainer);

   asteroidSpawner = setInterval(()=>asteroids.push(new Asteroid()), 10000);
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
/***/ (function(module, exports) {

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
/***/ (function(module, exports) {

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
/***/ (function(module, exports) {

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
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "/*@font-face {\r\n    src: url('../fonts/467.ttf');\r\n    font-family: cosmo;\r\n}*/\r\n\r\n\r\nbody {\r\n    padding: 0;\r\n    margin: 0;\r\n/*    background-image: url('../images/space-background.png');  */\r\n    width: 100%;\r\n    height: fit-content;\r\n}\r\n\r\nmain {\r\n    height: 2566px;\r\n    width: 1200px;\r\n    margin: auto;\r\n    font-family: cosmo;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: black;\r\n    border-radius: 86px;\r\n}\r\n\r\n.score-bar {\r\n    background-color: rebeccapurple;\r\n    width: 600px;\r\n    height: 400px;\r\n    margin: auto;\r\n    color: white;\r\n    display: flex;\r\n    font-family: Arial;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-around;\r\n    border-radius: 150px;\r\n    position: relative;\r\n    bottom: 753px; \r\n}\r\n\r\n.dead-indicator {\r\n    font-size: 45px;\r\n    margin-top: -6px;\r\n}\r\n\r\n.score-indicator {\r\n    font-size: 31px;\r\n    margin-top: -29px;\r\n}\r\n\r\n.menu-button {\r\n    margin-top: -30px;\r\n    width: 183px;\r\n    height: 48px;\r\n    border-radius: 23px;\r\n    background-color: steelblue;\r\n    color: white;\r\n    border: 0px;\r\n    font-size: 18px;\r\n}\r\n\r\n.menu-button:hover {\r\n    background-color: rgb(78, 78, 214);\r\n    cursor: pointer;\r\n}\r\n\r\n.play-menu {\r\n    width: 600px;\r\n    height: 240px;    \r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-direction: column;\r\n}\r\n\r\n.game-name {\r\n    color: white;\r\n    font-size: 52px;\r\n}\r\n\r\n.play-button {\r\n    font-weight: 700;\r\n    text-decoration: none;\r\n    text-shadow: 0 -1px 2px rgba(0,0,0,.2);\r\n    padding: .5em 1em;\r\n    outline: none;\r\n    border-radius: 3px;\r\n    box-shadow:\r\n     0 1px rgba(255,255,255,.2) inset,\r\n     0 3px 5px rgba(0,1,6,.5),\r\n     0 0 1px 1px rgba(0,1,6,.2);\r\n    transition: .2s ease-in-out;\r\n    width: 240px;\r\n    height: 72px;\r\n    font-size: 30px;\r\n    font-family: cosmo;\r\n}\r\n\r\n.play-button:hover {\r\n    background-color: rgb(65, 63, 63);\r\n    cursor: pointer;\r\n}\r\n\r\n.controls-container {\r\n    width: 900px;\r\n    display: flex;\r\n    height: 335px;\r\n    margin-top: 58px;\r\n    flex-direction: column;\r\n}\r\n\r\n.controls-arrows {\r\n    width: 50%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\n.arrows-img {\r\n    width: 283px;\r\n    height: 191px;\r\n}\r\n\r\n.container {\r\n    display: flex;\r\n}\r\n\r\n.contorls-name {\r\n    color: white;\r\n    margin: auto;\r\n    font-size: 50px;\r\n    margin-bottom: 36px;\r\n}\r\n\r\n.arrows-info {\r\n    color: white;\r\n    font-family: arial;\r\n    font-size: 19px;\r\n}\r\n\r\n.controls-spacebar {\r\n    width: 50%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin-left: 177px;\r\n}\r\n\r\n.spacebar-img {\r\n    width: 283px;\r\n    height: 191px;\r\n}\r\n\r\n.spacebar-info {\r\n    color: white;\r\n    font-family: arial;\r\n    font-size: 19px;\r\n}\r\n\r\n.about-container {\r\n    width: 1000px;\r\n    height: fit-content;\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin-top: 30px;\r\n}\r\n\r\n.about-name {\r\n    font-size: 53px;\r\n    color: white;\r\n    width: fit-content;\r\n    margin: auto;\r\n    margin-bottom: 35px;\r\n    margin-top: 15px;\r\n}\r\n\r\n.screenshots-container {\r\n    height: fit-content;\r\n}\r\n\r\n.first-screenshot {\r\n    width: 1000px;\r\n}\r\n\r\n.second-screenshot {\r\n    width: 1000px;\r\n    margin-top: 20px;\r\n}\r\n\r\n.about-info {\r\n    color: white;\r\n    font-family: arial;\r\n    font-size: 24px;\r\n    width: 762px;\r\n    margin: auto;\r\n    margin-top: 16px;\r\n}\r\n\r\n.dev-info-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin-top: 60px;\r\n}\r\n\r\n.dev-heading {\r\n    color: white;\r\n    font-size: 51px;\r\n    width: fit-content;\r\n    margin: auto;\r\n}\r\n\r\n.dev-img {\r\n    width: 500px;\r\n    height: 400px;\r\n    border-radius: 250px;\r\n    margin-top: 40px;\r\n    margin: auto;\r\n}\r\n\r\n.dev-name {\r\n    width: fit-content;\r\n    margin: auto;\r\n    font-size: 35px;\r\n    font-family: fantasy;\r\n    color: wheat;\r\n}\r\n\r\n.dev-info {\r\n    color: white;\r\n    font-family: Arial;\r\n    font-size: 23px;\r\n    width: 501px;\r\n}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);