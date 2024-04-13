function createNewCard() {
  let cardElement = document.createElement("div");
	
  cardElement.classList.add("card");
	
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;

	return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  	
  parentElement.appendChild(cardElement);
	
	return cardElement;

}
appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", 
                     "image-2", "image-2", 
                     "image-3", "image-3", 
                     "image-4", "image-4", 
                     "image-5", "image-5",
                     "image-6", "image-6"];

   let shuffledClasses = _.shuffle(cardClasses);
  
   return shuffledClasses;
}
shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];

  for (let i = 0; i < 12; i++) {
    let cardElement = appendNewCard(parentElement);
		
    cardElement.classList.add(shuffledImageClasses[i]);
   
    let cardObject = {
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i]
    };
    cardObjects.push(cardObject);    
  }
    
  return cardObjects;  
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}
doCardsMatchTest();

let counters = {};


function incrementCounter(counterName, parentElement) {
	if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  
	counters[counterName]++;

	parentElement.innerHTML = counters[counterName];
}
incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
	incrementCounter('flips', document.getElementById('flip-count'));

	if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }  

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove('flipped');
    newlyFlippedCard.element.classList.remove('flipped');
    lastCardFlipped = null;
    return;
	} else {
    incrementCounter('matches', document.getElementById('match-count'));

    lastCardFlipped.element.classList.add('glow');
    newlyFlippedCard.element.classList.add('glow');
  
    if (counters['matches'] === 6) {
      if (!winAudio.paused) {
        winAudio.pause();
        winAudio.currentTime = 0;
      }
      winAudio.play();
    } else {
      if (!matchAudio.paused) {
        matchAudio.pause();
        matchAudio.currentTime = 0;
      }
      matchAudio.play();
    }
  	
    lastCardFlipped = null;
  }
}

function resetGame() {
  let cardContainer = document.getElementById('card-container');
	
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
	
  document.getElementById('flip-count').textContent = '0';
  document.getElementById('match-count').textContent = '0';
  
  counters = {};
	
  lastCardFlipped = null;
	
  setUpGame();

  winAudio.currentTime = 0;
}


setUpGame();


document.getElementById('reset-button').addEventListener('click', function() {
    matchAudio.pause();
    winAudio.pause();

    resetGame();
});