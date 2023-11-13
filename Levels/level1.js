/**
 * Creates array of background objects.
 *
 * @param {string}
 * @param {number}
 * @returns {BackgroundObject[]}
 */
function createBackgroundObjects(imageSets, count) {
  const objects = [];
  const imageWidth = 719;

  // Startposition nach links erweitern
  const startPosition = -imageWidth; // Bild vor dem Startpunkt

  for (let i = 0; i < count; i++) {
    const position = startPosition + imageWidth * i;
    const currentSet = imageSets[i % imageSets.length];
    for (const imagePath of currentSet) {
      objects.push(new BackgroundObject(imagePath, position));
    }
  }
  return objects;
}

/**
 * First level of the game.
 * Sets the background, characters, objects.
 */
function initLevel1() {
  const imageSets = [
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/2.png",
      "img/5_background/layers/2_second_layer/2.png",
      "img/5_background/layers/1_first_layer/2.png",
    ],
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/1.png",
      "img/5_background/layers/2_second_layer/1.png",
      "img/5_background/layers/1_first_layer/1.png",
    ],
  ];

  const backgroundObjects = createBackgroundObjects(imageSets, 6);

  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [new Cloud(), new Cloud()],
    backgroundObjects,
    [
      new Coin(250, 80),
      new Coin(900, 100),
      new Coin(1800, 80),
      new Coin(1900, 80),
      new Coin(2300, 100),
    ],
    [
      new Bottle(350, 350),
      new Bottle(400, 350),
      new Bottle(1300, 350),
      new Bottle(1700, 350),
      new Bottle(2000, 350),
    ],
    [
      new BottleCube(600, 60),
      new BottleCube(1200, 60),
      new BottleCube(2000, 60),
      new BottleCube(2200, 60),
    ]
  );
}
