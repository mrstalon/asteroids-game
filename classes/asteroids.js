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