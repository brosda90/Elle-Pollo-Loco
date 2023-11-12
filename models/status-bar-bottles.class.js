class StatusBarBottles extends DrawableObject {
  /**
   * Constructs the status bar for bottles with default settings.
   * It initializes image paths.
   * percentage of the status bar, and positions the status bar within the game world.
   */
  constructor() {
    super();
    this.IMAGES = this.generateStatusBarImages(
      "img/7_statusbars/1_statusbar",
      "blue",
      "3_statusbar_bottle"
    );
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 0;
    this.y = 50;
    this.width = 250;
    this.height = 60;
  }
}
