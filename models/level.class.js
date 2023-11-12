/**
 * Represents a level in the game, containing enemies, clouds, background objects, and collectibles.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coin;
  bottle;
  BottleCube;
  level_end_x = 2900;

  constructor(enemies, clouds, backgroundObjects, coin, bottle, BottleCube) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coin = coin;
    this.bottle = bottle;
    this.BottleCube = BottleCube;
  }
}
