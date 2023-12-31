class StatusBarCoins extends DrawableObject {
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
      "1_statusbar_coin"
    );
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 25;
    this.y = 20;
    this.width = 250;
    this.height = 60;
  }
}
