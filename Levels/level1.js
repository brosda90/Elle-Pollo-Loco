let level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [new Cloud(), new Cloud()],
  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 4
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 4
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 4
    ),
  ],
  [
    new Coin(400, 80),
    new Coin(900, 100),
    new Coin(1800, 80),
    new Coin(1900, 80),
    new Coin(2300, 100),
  ],
  [
    new Bottle(600, 350),
    new Bottle(1000, 350),
    new Bottle(1300, 350),
    new Bottle(1700, 350),
    new Bottle(2000, 350),
  ]
);
