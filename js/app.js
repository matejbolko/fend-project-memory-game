// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle (array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

// create cars and append them to HTML doc
function CreateCards () {
  // create UL
  let ul = document.createElement('ul')
  ul.classList.add('deck')
  ul.id = 'deckid'
  document.querySelector('.container').appendChild(ul)

  // create 12li classes named "cardidX" where X = number
  for (let x = 0; x < 16; x++) {
    let li = document.createElement('li')
    li.className = 'card'
    li.id = 'cardid' + x

    var i = document.createElement('i')
    i.className = 'fa'
    i.classList.add(memoryCards[x])

    li.appendChild(i)
    ul.appendChild(li)
  }
}

// two cards do not match
function getUnmatchedCards (c1, c2) {
  // disable mouse click
  let tmp = document.getElementsByClassName('container')
  tmp[0].classList.add('disable')
  window.setTimeout(function () {
    c1.classList.remove('show', 'open')
    c2.classList.remove('show', 'open')
    tmp[0].classList.remove('disable')
  }, 1000)
}

// matching cards
function getMatchedCards (c1, c2) {
  // disable mouse click + disable mouse click on matched elements
  let tmp = document.getElementsByClassName('container')
  tmp[0].classList.add('disable')
  window.setTimeout(function () {
    // add class "match" to matching cards (LI element)
    c1.classList.add('match', 'disable')
    c2.classList.add('match', 'disable')
    tmp[0].classList.remove('disable')
    // check if game is over
    isGameOver()
  }, 1000)
}

// restart game
function restartGame () {
  let elements = document.getElementsByClassName('card')
  let deck = document.getElementById('deckid')
  let symbols = deck.getElementsByClassName('fa')

  // shuffle cards again
  memoryCards = shuffle(memoryCards)

  // remove all classes on cards
  for (let x = 0; x < elements.length; x++) {
    elements[x].classList.remove('match', 'open', 'show', 'disable')
  }

  // remove all symbols
  for (let x = 0; x < symbols.length; x++) {
    symbols[x].classList.remove('fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb')
    symbols[x].classList.add(memoryCards[x])
  }

  // empty all variables
  matchedCards = []
  openedCards = []
  resetTimer()
  console.log(memoryCards)
}

function isGameOver () {
  if (matchedCards.length === 16) {
    window.setTimeout(function () {
      window.alert('GAME OVER' + t)
    }, 100)
  }
}

function timer () {
  t = setTimeout(add, 1000);
}

function resetTimer () {
  clearTimeout(t);
  t = 0
  sec = 0
  min = 0
  var clock = document.getElementById('timer')
  clock.textContent = '00:00'
  timer()
}

function add() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
  var clock = document.getElementById('timer')
  clock.textContent = (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec)
  timer()
}

function startGames () {
  document.getElementById('startMenu').style.display = 'none'
  document.getElementById('disableGame').style.display = 'none'
  document.getElementById('startMenu').style.display = 'none'
  document.getElementById('disableGame').style.display = 'none'
  timer()
}


function rotateCard (e) {
  let id = e.target.id
  let element = e.target

  // on clikc - open card (if it is not already opened)
  if (openedCards.includes(id) === false || matchedCards.includes(id) === false) {
    openedCards.push(id)
    element.classList.add('show')
    element.classList.add('open')
  }

  // if 2 cards are opened - check if matched or missmatched
  if (openedCards.length === 2) {
    // read 2 cards ID
    let elid1 = openedCards.pop()
    let elid2 = openedCards.pop()
    // get elements from ID
    let el1 = document.getElementById(elid1)
    let el2 = document.getElementById(elid2)
    // read and compare 2 card symbols (I class)
    let sym1 = el1.querySelector('i')
    let sym2 = el2.querySelector('i')
    // each I selector has two classes - read the second one
    sym1 = sym1.classList.item(1)
    sym2 = sym2.classList.item(1)
    if (sym1 === sym2) {
      matchedCards.push(elid1)
      matchedCards.push(elid2)
      getMatchedCards(el1, el2)
    } else {
      getUnmatchedCards(el1, el2)
    }

    moves = moves + 1
    document.getElementById('moves').innerHTML = moves.toString()
  }
}

// start Meni - on clik, disable elements
let startGame = document.getElementById('startGame')
startGame.addEventListener('click', startGames)

// prepare everything for the game
let memoryCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']
let matchedCards = []
let openedCards = []
let moves = 0
let sec = 0
let min = 0
let t

memoryCards = shuffle(memoryCards)
console.log(memoryCards)
CreateCards()

// add eventListeners for clicking on cards + restartButton
var cardsListener = document.querySelectorAll('.card')
for (let i = 0; i < cardsListener.length; i++) {
  cardsListener[i].addEventListener('click', rotateCard)
}
document.querySelector('.restart').addEventListener('click', restartGame)
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
