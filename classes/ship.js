import {shipImg} from '../sketch';
import p5 from 'p5';

export default function Ship() {
        this.pos = createVector(width/2, height/2);
        this.heading = 0;
        this.rotation = 0;
        this.velocity = createVector(0, 0);
        this.isMovingForward = false;
        this.isMovingBackward = false;
}

Ship.prototype.movingForward = function(isMovingForward) {
    this.isMovingForward = isMovingForward;
}

Ship.prototype.movingBackward = function(isMovingBackward) {
    this.isMovingBackward = isMovingBackward;
}

Ship.prototype.update = function() {
    if(this.isMovingForward) {
        this.move();
    }else if(this.isMovingBackward) {
        this.move(-PI);
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.85);
}

Ship.prototype.move = function(direction = 0) {
    let force = p5.Vector.fromAngle(this.heading+direction);
    this.velocity.add(force);
}

Ship.prototype.render = function() {
    push();
    translate(this.pos.x, this.pos.y); 
    rotate(this.heading + PI / 2);
    imageMode(CENTER);
    image(shipImg,0,0);
    pop();
}

Ship.prototype.setRoration = function(angle) {
    this.rotation = angle;
}

Ship.prototype.edges = function() {
    if(this.pos.x > width + shipImg.width) {
        this.pos.x = -shipImg.width;
    }else if(this.pos.x < -shipImg.width) {
        this.pos.x = width + shipImg.width;
    }else if(this.pos.y > height + shipImg.height) {
        this.pos.y = -shipImg.height;
    }else if(this.pos.y < -shipImg.height) {
        this.pos.y = height + shipImg.height;
    }
}


Ship.prototype.turn = function() {
    this.heading += this.rotation;
}


Ship.prototype.hits = function(asteroid) {
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);

    if(distance < asteroid.radious+15) {
        return true;
    }else {
        return false;
    }
}



