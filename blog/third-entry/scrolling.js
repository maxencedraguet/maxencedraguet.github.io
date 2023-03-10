const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

const cardLimit = 99;
const cardIncrease = 9;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

var throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);

  return `hsl(${h}deg, 90%, 85%)`;
};

const getRandomImage = () => {
  const h = Math.floor(Math.random() * 100 / 17);
  thestr = '/images/' + `${h}`+ '.jpeg';
  if (h > 2){
    thestr2 = 'A beautiful Dali';
  } else {
    thestr2 = 'A stunning Magritte';
  }
  return [thestr, thestr2];
};

const createCard = (index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = index;
  card.style.backgroundColor = getRandomColor();
  cardContainer.appendChild(card);
};

function some_magic(divFBba) {
  const card = document.createElement("p");
  card.innerHTML = "Maybe";
  document.getElementById(divFBba).appendChild(card);
}

const loadImCard = (index) => {
  const card = document.createElement("div"); card.className = "card";
  const divFBin = document.createElement("div"); divFBin.className = "flip-box-inner";
  const divFBfr = document.createElement("div"); divFBfr.className = "flip-box-front";
  const divFBba = document.createElement("div"); divFBba.className = "flip-box-back";
  
  //const butt = document.createElement("button");
  //butt.className = "buttonRoll";
  //butt.type ="submit";

  const theim = document.createElement("img");
  zestring = getRandomImage();
  theim.src = zestring[0];
  theim.className = "img-fluid card-img-top";
  //theim.alt="buttonpng"; 

  /*
  butt.appendChild(theim); 
  card.appendChild(butt); 
  */

  // Front
  divFBfr.appendChild(theim); 
  // Back
  divFBba.id = "theback_" + (Math.random() + 1).toString(36).substring(7);
  divFBba.innerHTML += "<h2>" + zestring[1] +"</h2>";
  divFBba.innerHTML += "<p>What an amazing painter</p>";
  // ... with a button now: 
  const zebout = document.createElement("button"); 
  const res = document.createElement("p"); 
  zebout.onclick = function some_magic() {
    res.innerHTML = "Totally dude";
  }
  zebout.innerHTML += "Is this true?";
  divFBba.appendChild(zebout);
  divFBba.appendChild(res);

  // Adding everything
  divFBin.appendChild(divFBfr); 
  divFBin.appendChild(divFBba); 
  card.appendChild(divFBin); 
  cardContainer.appendChild(card);
};

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

  cardCountElem.innerHTML = endRange;

  for (let i = startRange + 1; i <= endRange; i++) {
    //createCard(i);
    loadImCard(i);
  }
};

const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
      addCards(currentPage + 1);
    }

    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 1000);
};

const removeInfiniteScroll = () => {
  loader.remove();
  window.removeEventListener("scroll", handleInfiniteScroll);
};

window.onload = function () {
  addCards(currentPage);
};

window.addEventListener("scroll", handleInfiniteScroll);