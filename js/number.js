const images = [
  {
    image_name: "bananas.jpg",
    number_of_items: 6,
  },
  {
    image_name: "birthday candles.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "blocks.jpeg",
    number_of_items: 6,
  },
  {
    image_name: "brushes.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "cakes.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "cars.jpeg",
    number_of_items: 2,
  },
  {
    image_name: "crayons.jpeg",
    number_of_items: 8,
  },
  {
    image_name: "cupcakes.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "deer.jpeg",
    number_of_items: 3,
  },
  {
    image_name: "donuts.jpeg",
    number_of_items: 6,
  },
  {
    image_name: "ducks.jpeg",
    number_of_items: 6,
  },
  {
    image_name: "eggs.jpeg",
    number_of_items: 8,
  },
  {
    image_name: "elephants.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "hot air balloons.jpeg",
    number_of_items: 5,
  },
  {
    image_name: "jelly beans.jpeg",
    number_of_items: 9,
  },
  {
    image_name: "macaroons.jpeg",
    number_of_items: 7,
  },
  {
    image_name: "pencils.jpeg",
    number_of_items: 12,
  },
  {
    image_name: "people.jpeg",
    number_of_items: 6,
  },
  {
    image_name: "peppers.jpeg",
    number_of_items: 2,
  },
  {
    image_name: "pizza slices.jpeg",
    number_of_items: 8,
  },
];

let currentImageValue = 0,
  displayValue = 0,
  score = 0,
  totalAvailable = images.length,
  chosen = false;

const timeDelay = 3000;

document.getElementById("statsContent").style.display = "none";
document.getElementById("currentScore").innerHTML = score;
document.getElementById("totalAvailable").innerHTML = totalAvailable;
document.getElementById("timeSettings").innerHTML = timeDelay / 1000;

const setImagesrc = (randomImageName) => {
  const imageContainer = document.getElementById("imageContainer");
  if (imageContainer.hasChildNodes())
    imageContainer.removeChild(imageContainer.firstChild);

  const image = document.createElement("img");
  image.src = `images/${randomImageName}`;
  image.classList.add("fade");
  imageContainer.appendChild(image);
};

generateDisplayName = (numberOfItems, plusOrMinus) => {
  const split = Math.floor(Math.random() * 2);
  if (split === 0) {
    document.getElementById("numbers").innerHTML = numberOfItems;
    displayValue = numberOfItems;
  } else {
    document.getElementById("numbers").innerHTML = `${
      numberOfItems + plusOrMinus
    }`;
    displayValue = numberOfItems + plusOrMinus;
  }
  currentImageValue = numberOfItems;
};

const match = () => {
  if (!chosen) {
    currentImageValue === displayValue ? score++ : score--;
    chosen = true;
    document.getElementById("currentScore").innerHTML = score;
  }
};
const noMatch = () => {
  if (!chosen) {
    currentImageValue !== displayValue ? score++ : score--;
    chosen = true;
    document.getElementById("currentScore").innerHTML = score;
  }
};

const generateImageName = (randomImageName) => {
  const imageName = randomImageName.slice(0, randomImageName.length - 5);
  document.getElementById("item-names").innerHTML = imageName + "?";
  // console.log(imageName);
};

const generatePlusorMinus = () => {
  const number0to1 = Math.floor(Math.random() * 2);
  return number0to1 === 0 ? -1 : +1;
};

const generate = () => {
  if (images.length === 0) {
    endOfGame();
    stopper();
    return;
  }
  chosen = false;
  const randomNumber = Math.floor(Math.random() * images.length);
  const randomImageName = images[randomNumber].image_name;
  // console.log(randomImageName);
  setImagesrc(randomImageName);
  generateImageName(randomImageName);
  const plusOrMinus = generatePlusorMinus();
  const numberOfItems = images[randomNumber].number_of_items;

  generateDisplayName(numberOfItems, plusOrMinus);

  images.splice(randomNumber, 1);
};

let stopTimer;
const timer = () => {
  stopTimer = setInterval(generate, timeDelay);
};

const play = () => {
  document.getElementById("message").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("play-button").style.display = "none";
  document.getElementById("statsContent").style.display = "block";

  generate();
  timer();
};

const endOfGame = () => {
  document.getElementById("message").style.display = "block";
  document.getElementById("imageContainer").style.display = "none";
  document.getElementById("statsContent").style.display = "none";
  document.getElementById(
    "message"
  ).innerHTML = `Game Over! Your score is ${score} / ${totalAvailable}`;
  setTimeout(() => location.reload(), 4000);
};

const stopper = () => {
  clearInterval(stopTimer);
};
