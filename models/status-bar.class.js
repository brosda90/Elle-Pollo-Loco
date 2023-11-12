class StatusBar extends DrawableObject {
  /**
   * Constructs the status bar for coins with default settings.
   * It initializes image paths .
   * percentage of the status bar, and positions the status bar within the game world.
   */
  constructor() {
    super();
    this.IMAGES = this.generateStatusBarImages(
      "img/7_statusbars/1_statusbar",
      "blue",
      "2_statusbar_health"
    );
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 60;
    this.y = -10;
    this.width = 250;
    this.height = 60;
  }
}
