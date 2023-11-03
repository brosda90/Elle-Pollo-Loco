class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 295;
  height = 150;
  width = 100;
  frameOffset = { x: 0, y: 0, width: 0, height: 0 };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  showFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "0";
      ctx.strokeStyle = "";
      ctx.rect(
        this.x + this.frameOffset.x,
        this.y + this.frameOffset.y,
        this.width + this.frameOffset.width,
        this.height + this.frameOffset.height
      );
      ctx.stroke();
    }
  }
}
