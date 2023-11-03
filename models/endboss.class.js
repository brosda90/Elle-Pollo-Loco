class Endboss extends MovableObject {
  width = 200;
  height = 300;
  x = 2400;
  y = 150;
  speedX = 0; // Dies ist die Anfangsgeschwindigkeit des Endboss.

  wasHurtBefore = false;

  hit = false;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALK);

    this.animate();
  }

  die() {
    this.dead = true;
    setTimeout(() => {
      this.showWinScreen();
    }, 4000); // 2 Sekunden Verzögerung
  }

  hurt() {
    this.hurting = true;
    if (!this.wasHurtBefore) {
      this.speedX = -5; // Setzt die Geschwindigkeit, wenn er das erste Mal getroffen wird.
    }
    setTimeout(() => {
      this.hurting = false;
    }, 1000);
  }

  isDead() {
    return this.dead;
  }

  isHurt() {
    return this.hurting;
  }

  move() {
    this.x -= this.speed; // Hier wird der Endboss nach links bewegt. Du kannst es ändern, um die Richtung zu steuern.
  }

  showWinScreen() {
    const winContainer = document.getElementById("win-container");
    winContainer.style.display = "block";

    setTimeout(() => {
      const restartGameButton = document.getElementById("restartGameButton");
      restartGameButton.addEventListener("click", () => {
        location.reload(); // Dies lädt die Seite neu und startet das Spiel neu.
      });
    }, 1000);
  }

  animate() {
    setInterval(() => {
      if (this.wasHurtBefore) {
        this.x += this.speedX; // bewegt den Endboss in X-Richtung.
      }
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speedX = 0;

        // Hier wird der Endboss aus der Gegnerliste entfernt
        let index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
          setTimeout(() => {
            this.world.level.enemies.splice(index, 1);
            this.world.endbossHealthbar.isVisible = false;
          }, this.IMAGES_DEAD.length * 1000); // Die Zeit, die benötigt wird, um die IMAGES_DEAD-Animation abzuspielen
        }
      } else if (this.isHurt()) {
        if (!this.wasHurtBefore) {
          this.playAnimation(this.IMAGES_ALERT);

          // Warte bis die IMAGES_ALERT Animation abgespielt wurde
          setTimeout(() => {
            this.wasHurtBefore = true;
          }, this.IMAGES_ALERT.length * 160);
        } else {
          this.playAnimation(this.IMAGES_HURT);
        }
      } else {
        this.playAnimation(this.IMAGES_WALK);
      }
    }, 160);
  }
}
