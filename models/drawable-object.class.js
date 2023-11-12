class DrawableObject {
  /**
   * Creates drawable object.
   * @param {number} [x=100]
   * @param {number} [y=295]
   * @param {number} [width=100]
   * @param {number} [height=150]
   */
  constructor(x = 100, y = 295, width = 100, height = 150) {
    this.img = null;
    this.imageCache = {};
    this.currentImage = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameOffset = { x: 0, y: 0, width: 0, height: 0 };
  }

  /**
   * Generates a list of image paths.
   * @param {string} basePath
   * @param {string} prefix
   * @param {number} start
   * @param {number} end
   * @returns {string[]}
   */
  generateImagePaths(basePath, prefix, start, end) {
    let paths = [];
    for (let i = start; i <= end; i++) {
      paths.push(`${basePath}/${prefix}-${i}.png`);
    }
    return paths;
  }

  /**
   * Generates image paths for a statusbars based on percentage.
   * @param {string} basePath
   * @param {string} color
   * @param {string} type
   * @returns {string[]}
   */
  generateStatusBarImages(basePath, color, type) {
    const percentages = [0, 20, 40, 60, 80, 100];
    return percentages.map(
      (percentage) => `${basePath}/${type}/${color}/${percentage}.png`
    );
  }

  /**
   * Sets the object's image based on a percentage.
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage.
   * @returns {number}
   * @private
   */
  resolveImageIndex() {
    return Math.min(Math.floor(this.percentage / 20), 5);
  }

  /**
   * Loads an image from a path and sets it as an object image.
   * @param {string} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads a set of images and caches them.
   * @param {string[]} arr
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the game over image on the canvas context.
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLImageElement} image
   * @param {number} y
   */
  drawGameOverImage(ctx, image, y) {
    let newWidth = image.width * 0.5;
    let newHeight = image.height * 0.5;
    ctx.drawImage(image, (720 - newWidth) / 2, y, newWidth, newHeight);
  }

  /**
   * Draws the object's current image to the canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Draws a frame around the object if it's an instance of certain classes.
   * @param {CanvasRenderingContext2D} ctx
   */
  showFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof BottleCube ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
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
