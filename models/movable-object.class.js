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

  /**
   * Applies gravity to the object, causing it to fall if it's above the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0; // Setzen Sie speedY zurück, wenn der Charakter den Boden berührt
      }
      console.log(this.speedY);
    }, 1000 / 25);
  }
  /**
   * Determines if the object is above the ground.
   * @returns {boolean} True / false otherwise.
   */
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

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo
   * @returns {boolean}
   */
  isColliding(mo) {
    let thisLeft = this.x + this.frameOffset.x;
    let thisRight = this.x + this.width + this.frameOffset.width;
    let thisTop = this.y + this.frameOffset.y;
    let thisBottom = this.y + this.height + this.frameOffset.height;

    let moLeft = mo.x + mo.frameOffset.x;
    let moRight = mo.x + mo.width + mo.frameOffset.width;
    let moTop = mo.y + mo.frameOffset.y;
    let moBottom = mo.y + mo.height + mo.frameOffset.height;

    return (
      thisRight > moLeft &&
      thisLeft < moRight &&
      thisBottom > moTop &&
      thisTop < moBottom
    );
  }

  /**
   * Handles the object being hit by an enemy or obstacle, reducing its energy.
   */
  hit() {
    this.energy -= 20;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Manages the hit counter for the object, triggering hurt or death based on the number of hits.
   */
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

  /**
   * Increases the coin count for the object.
   */
  count() {
    this.coinCount += 20;
  }

  /**
   * Increases the bottle count for the object, ensuring it does not exceed 100.
   * @param {boolean} isBottleCube - Optional parameter to check if it's a BottleCube.
   */
  countBottles(isBottleCube = false) {
    const amount = isBottleCube ? 40 : 20;
    if (this.bottleCount + amount > 100) {
      this.bottleCount = 100; // Setzt die Flaschenanzahl auf 100, wenn das Limit überschritten würde
    } else {
      this.bottleCount += amount;
    }
  }

  /**
   * Determines if the object is currently hurt.
   * @returns {boolean} True / false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  /**
   * Determines if the object is dead.
   * @returns {boolean} True / false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by increasing its x-coordinate.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }
  /**
   * Causes the object to jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Plays a given animation sequence for the object.
   * @param {string[]} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
