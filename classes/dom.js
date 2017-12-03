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