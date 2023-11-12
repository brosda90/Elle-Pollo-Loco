class Collectible extends MovableObject {
  /**
   * Creates a new collectible object (coins, bottles, bottle cube).
   * @param {number} x - The x-coordinate of the collectible.
   * @param {number} y - The y-coordinate of the collectible.
   * @param {string[]} imagePaths - An array of paths to the images for the collectible.
   */
  constructor(x, y, imagePaths) {
    super(x, y);
    this.IMAGES = imagePaths;
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;

    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 250);
  }
}
