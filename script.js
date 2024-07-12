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
  seen.appendChild(document.createTextNode("seen cards"));
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
      if (guessesRemaining == 0) {return;}
      nextCard = 0;
      //let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
      currentGuess = [selectPeople.value, selectRoom.value, selectWeapon.value];
      console.log('guess string ', currentGuess);
      for (var i=0; i<3; i++) {
        console.log('pressed key ', currentGuess[i], 'letter row ', 6 - guessesRemaining);
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
        let box = row.children[nextCard];
        //animateCSS(box, "pulse");
        console.log('current guess init?', currentGuess);
        box.textContent = currentGuess[i];
        box.classList.add("filled-box");
        nextCard += 1;
      }

      guessesRemaining -= 1;
      console.log('guessesRemaining ', guessesRemaining);
      // for (const val of currentGuess) {
      //   guessString += val;
      // }
      // var letterColor = ["gray", "gray", "gray"];
      if (JSON.stringify(currentGuess) === JSON.stringify(answer)) {
        console.log('you win');
        guessesRemaining = 0;
      }
      else {console.log('you lose');}
  }  
  guessBtn.appendChild(document.createTextNode("submit"));
  board.append(guessBtn);

}





  const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

// document.addEventListener("keyup", (e) => {
//     console.log('e', e);
//     if (guessesRemaining === 0) {
//       return;
//     }
  
//     let pressedKey = String(e.key);
  
//     if (pressedKey === "Enter") {
//       checkGuess();
//       return;
//     }
  
//     let found = pressedKey.match(/[a-z]/gi);
//     if (!found || found.length > 1) {
//       return;
//     } else {
//       insertLetter(pressedKey);
//     }
//   });

initBoard();