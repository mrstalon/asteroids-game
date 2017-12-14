import p5 from 'p5';

export default function Laser(shipPosition, shootDirection) {
    this.pos = createVector(shipPosition.x, shipPosition.y);
    this.velocity = p5.Vector.fromAngle(shootDirection);
    this.velocity.mult(10);

}

Laser.prototype.update = function() {
    this.pos.add(this.velocity);
}

Laser.prototype.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    if(gameMode === 'rage') {
        point(this.pos.x + 10, this.pos.y + 10);
        point(this.pos.x - 10, this.pos.y - 10);
        point(this.pos.x + 7, this.pos.y + 7);
        point(this.pos.x - 7, this.pos.y - 7);
        point(this.pos.x, this.pos.y);
    }else {
        point(this.pos.x, this.pos.y);
    }
    pop();
}

Laser.prototype.hits = function(asteroid) {
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    
    if(distance < asteroid.radious) {
        return true;
    }else {
        return false;
    }
}
