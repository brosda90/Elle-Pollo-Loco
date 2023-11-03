class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  endbossHealthbar = new EndbossHealthbar();
  throwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext(`2d`);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.statusBar = this.statusBar;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollect();
      this.checkIfBottleHits();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.ALT && this.character.bottleCount >= 20) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this
      );
      this.throwableObject.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Chicken) {
          // console.log(enemy.hit);
          if (enemy.isStompedBy(this.character)) {
            console.log("stomped!");
            enemy.hitByBottle();
          } else {
            console.log("character hit!");
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        } else if (enemy instanceof Endboss) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkIfBottleHits() {
    let collisionDetected = false;
    for (let throwable of this.throwableObject) {
      for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (throwable.isColliding(enemy)) {
          collisionDetected = true;
          if (enemy instanceof Chicken) {
            enemy.hitByBottle();
          } else if (enemy instanceof Endboss) {
            enemy.hitCounter();

            this.endbossHealthbar.updateHealthBar(enemy.hitCount);
          }
        }
      }
    }
    return collisionDetected;
  }

  checkCoinCollisions() {
    for (let i = 0; i < this.level.coin.length; i++) {
      let coin = this.level.coin[i];
      if (this.character.isColliding(coin)) {
        this.character.count();
        this.statusBarCoins.setPercentage(this.character.coinCount);

        this.level.coin.splice(i, 1);
        i--;
      }
    }

    if (this.level.coin.length === 0) {
      this.character.scaleSize(1.3);
      this.character.hasScaled = true;
    }
  }

  checkBottleCollect() {
    for (let i = 0; i < this.level.bottle.length; i++) {
      let bottle = this.level.bottle[i];
      if (this.character.isColliding(bottle)) {
        this.character.countBottles();
        this.statusBarBottles.setPercentage(this.character.bottleCount);

        this.level.bottle.splice(i, 1);

        i--;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.endbossHealthbar);

    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.showFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
