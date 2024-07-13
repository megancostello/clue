import { rooms } from "./clues.js";
import { weapons } from "./clues.js";
import { people } from "./clues.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextCard = 0;
let seenCards = [];

// picks answer cards
let answer = [people[Math.floor(Math.random() * people.length)], rooms[Math.floor(Math.random() * rooms.length)], weapons[Math.floor(Math.random() * weapons.length)]];
// combines all cards, filters out answer cards, sorts "randomly"
let remainingCards = people.concat(weapons).concat(rooms).filter(card => !answer.includes(card)).sort(() => Math.random() - 0.5)

console.log(answer);
console.log(remainingCards);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 3; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }

  // add seen cards at bottom
  let seen = document.createElement("div");
  seen.className = "seenCards";
  seen.appendChild(document.createTextNode("SEEN CARDS: "));
  seen.appendChild(document.createTextNode(seenCards.toString()));
  board.appendChild(seen);

  let selectPeople = document.createElement("select");
  for (let c = 0; c<people.length; c++) {
    selectPeople.options.add(new Option (people[c]));
  }
  board.append(selectPeople);

  let selectRoom = document.createElement("select");
  for (let c = 0; c<rooms.length; c++) {
    selectRoom.options.add(new Option (rooms[c]));
  }
  board.append(selectRoom);

  let selectWeapon = document.createElement("select");
  for (let c = 0; c<weapons.length; c++) {
    selectWeapon.options.add(new Option (weapons[c]));
  }
  board.append(selectWeapon);

  let guessBtn = document.createElement("button"); 
  guessBtn.className = "guessButton";
  guessBtn.onclick = function checkGuess() {
      console.log("CHECK GUESS");
      // end game
      if (guessesRemaining == 0) {return;}

      nextCard = 0;

      currentGuess = [selectPeople.value, selectRoom.value, selectWeapon.value];
      console.log('guess string ', currentGuess);
      for (let i=0; i<3; i++) {
        console.log('pressed key ', currentGuess[i], 'letter row ', 6 - guessesRemaining);
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
        let box = row.children[nextCard];

        console.log('current guess init?', currentGuess);
        box.textContent = currentGuess[i];
        box.classList.add("filled-box");
        nextCard += 1;
      }
      
      // decrement guesses
      guessesRemaining -= 1;
      console.log('guessesRemaining ', guessesRemaining);

      if (JSON.stringify(currentGuess) === JSON.stringify(answer)) {
        console.log('you win');
        guessesRemaining = 0;
      }
      else {
        console.log('you lose');
        // check which card to show user to disprove answer
        // shows same card if applicable
        for (let i=0; i<remainingCards.length; i++) {
          if (currentGuess[0] == remainingCards[i] || currentGuess[1] == remainingCards[i] || currentGuess[2] == remainingCards[i] ) {
            if (seenCards.includes(remainingCards[i]))  {
              return;
            }
            else {
              seenCards.push(remainingCards[i]);
              seen.appendChild(document.createTextNode(" ".concat(remainingCards[i].toString())));
              board.appendChild(seen);
              console.log('adding ', remainingCards[i], ' to seen deck');
            }
            return;
          }
        }
      }
  }  
  guessBtn.appendChild(document.createTextNode("submit"));
  board.append(guessBtn);
}

initBoard();