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

function CreateCards () {
  // create UL
  let ul = document.createElement('ul')
  ul.classList.add('deck')
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

function getMatchedCards (c1, c2) {
  // disable mouse click
  let tmp = document.getElementsByClassName('container')
  tmp[0].classList.add('disable')
  window.setTimeout(function () {
    // add class "match" to matching cards (LI element)
    c1.classList.add('match')
    c2.classList.add('match')
    matchedCounter = matchedCounter + 2
    tmp[0].classList.remove('disable')
  }, 1000)
}

function rotateCard (e) {
  let id = e.target.id
  let element = e.target

  // on clikc - open card (if it is not already opened)
  if (openedCards.includes(id) === false) {
    openedCards.push(id)
    element.classList.add('show')
    element.classList.add('open')
  }

  // if 2 cards are opened - check if matched or missmatched
  if (openedCards.length === 2) {
    // read 2 cards classes
    let el1 = openedCards.pop()
    let el2 = openedCards.pop()
    el1 = document.getElementById(el1)
    el2 = document.getElementById(el2)
    // read and compare 2 card symbols (I class)
    let sym1 = el1.querySelector('i')
    let sym2 = el2.querySelector('i')
    sym1 = sym1.classList.item(1)
    sym2 = sym2.classList.item(1)
    if (sym1 === sym2) {
      getMatchedCards(el1, el2)
    } else {
      getUnmatchedCards(el1, el2)
    }
  }
}

function restartGame () {
  let elements = document.getElementsByClassName('card')
  for (let x = 0; x < elements.length; x++) {
    elements[x].classList.remove('match', 'open', 'show')
  }
  shuffle(memoryCards)
}

var memoryCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']
shuffle(memoryCards)
// console.log("shuffledCards: "+shuffledCards);
CreateCards()
var matchedCounter = 0
var openedCards = []
document.querySelector('.deck').addEventListener('click', rotateCard)
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
