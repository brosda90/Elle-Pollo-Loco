class EndbossHealthbar extends MovableObject {
  IMAGES_HealthBar = [
    "img/7_statusbars/2_statusbar_endboss/blue.png",
    "img/7_statusbars/2_statusbar_endboss/green.png",
    "img/7_statusbars/2_statusbar_endboss/Orange.png",
  ];
  isVisible = false;
  hitCount = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HealthBar);
    this.x = 440;
    this.y = 5;
    this.width = 250;
    this.height = 60;
  }

  updateHealthBar(hitCount) {
    this.isVisible = true; // Healthbar wird sichtbar, wenn diese Methode aufgerufen wird
    this.hitCount = hitCount;
    let path = this.IMAGES_HealthBar[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  draw(ctx) {
    if (this.isVisible) {
      // Zeichnet die Healthbar nur, wenn sie sichtbar sein soll
      super.draw(ctx);
    }
  }

  resolveImageIndex() {
    if (this.hitCount === 1) {
      return 0;
    } else if (this.hitCount === 2) {
      return 1;
    } else {
      return 2;
    }
  }
}
