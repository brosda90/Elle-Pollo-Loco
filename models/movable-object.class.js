class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  coinCount = 0;
  bottleCount = 0;
  hitCount = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
      console.log(this.y);
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      if (this.hasScaled) {
        return this.y < this.baseY - 15;
      } else {
        return this.y < 150;
      }
    }
  }

  // character.isColliding(chicken)
  isColliding(mo) {
    // Berücksichtigung der frameOffset-Werte des aktuellen Objekts (this)
    let thisLeft = this.x + this.frameOffset.x; // Linke Grenze des aktuellen Objekts
    let thisRight = this.x + this.width + this.frameOffset.width; // Rechte Grenze des aktuellen Objekts
    let thisTop = this.y + this.frameOffset.y; // Obere Grenze des aktuellen Objekts
    let thisBottom = this.y + this.height + this.frameOffset.height; // Untere Grenze des aktuellen Objekts

    // Berücksichtigung der frameOffset-Werte des Zielobjekts (mo)
    let moLeft = mo.x + mo.frameOffset.x; // Linke Grenze des Zielobjekts
    let moRight = mo.x + mo.width + mo.frameOffset.width; // Rechte Grenze des Zielobjekts
    let moTop = mo.y + mo.frameOffset.y; // Obere Grenze des Zielobjekts
    let moBottom = mo.y + mo.height + mo.frameOffset.height; // Untere Grenze des Zielobjekts

    // Überprüfung, ob die Grenzen des aktuellen Objekts und des Zielobjekts sich überlappen
    return (
      thisRight > moLeft && // Rechte Grenze des aktuellen Objekts ist rechts von der linken Grenze des Zielobjekts
      thisLeft < moRight && // Linke Grenze des aktuellen Objekts ist links von der rechten Grenze des Zielobjekts
      thisBottom > moTop && // Untere Grenze des aktuellen Objekts ist unterhalb der oberen Grenze des Zielobjekts
      thisTop < moBottom // Obere Grenze des aktuellen Objekts ist oberhalb der unteren Grenze des Zielobjekts
    );
  }

  hit() {
    this.energy -= 20;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCounter() {
    if (!this.hit) {
      if (this.hitCount >= 3) {
        this.die();
      } else {
        this.hurt();
      }
      this.hitCount++;

      this.hit = true;
      setTimeout(() => {
        this.hit = false;
      }, 1000);
    }
    console.log("counts", this.hitCount);
  }

  count() {
    this.coinCount += 20;
  }

  countBottles() {
    this.bottleCount += 20;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 500; // Difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
