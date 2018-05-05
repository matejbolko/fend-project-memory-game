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
function createCards () {
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
    c1.classList.remove('show', 'open', 'disable')
    c2.classList.remove('show', 'open', 'disable')
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

  // remove all classes on cards then all symbols
  for (let x = 0; x < elements.length; x++) {
    elements[x].classList.remove('match', 'open', 'show', 'disable')
  }
  for (let x = 0; x < symbols.length; x++) {
    symbols[x].classList.remove('fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb')
    symbols[x].classList.add(memoryCards[x])
  }

  // reset all variables
  matchedCards = []
  openedCards = []
  timerReset()
  moves = 0
  document.getElementById('moves').innerHTML = moves.toString()

  // reset gameOver an score-panel stars
  let stars = document.querySelectorAll('ul')
  for (let i = 0; i < stars.length; i++) {
    let starChilds = stars[i].querySelectorAll('i')
    for (let i = 0; i < starChilds.length; i++) {
      starChilds[i].classList.add('fa-star')
      starChilds[i].classList.remove('fa-star-o')
    }
  }

  // easySolving consoleLog :)
  console.log(memoryCards)
} // restartGame

function timer () {
  t = setTimeout(timerAdd, 1000)
  ratingSystem()
}

function timerReset () {
  clearTimeout(t)
  t = 0
  sec = 0
  min = 0
  var clock = document.getElementById('timer')
  clock.textContent = '00:00'
  timer()
}

function timerAdd () {
  sec++
  if (sec >= 60) {
    sec = 0
    min++
  }
  var clock = document.getElementById('timer')
  clock.textContent = (min ? (min > 9 ? min : '0' + min) : '00') + ':' + (sec > 9 ? sec : '0' + sec)
  timer()
}

function timerStop () {
  clearTimeout(t)
  t = 0
  let endTime = min.toString() + 'min ' + sec.toString() + 'sec'
  return endTime
}

function ratingSystem () {
  // repleca stars in gameOver screen and on score-panel
  let stars = document.querySelectorAll('ul')
  for (let i = 0; i < stars.length; i++) {
    let starChilds = stars[i].querySelectorAll('i')
    if ((moves + (min * 60) + sec) > 80) {
      starChilds[0].classList.remove('fa-star')
      starChilds[0].classList.add('fa-star-o')
    } else if ((moves + (min * 60) + sec) > 65) {
      starChilds[1].classList.remove('fa-star')
      starChilds[1].classList.add('fa-star-o')
    } else if ((moves + sec) > 45) {
      starChilds[2].classList.remove('fa-star')
      starChilds[2].classList.add('fa-star-o')
    }
  }
}

function gameStart () {
  document.getElementById('start-menu').style.display = 'none'
  document.getElementById('disable-game').style.display = 'none'
  document.getElementById('end-menu').style.display = 'none'
  document.querySelector('.container').style.display = 'flex'
  if (gamePlayed >= 1) {
    restartGame()
  } else {
    timer()
  }
}

function gameOver () {
  gamePlayed = gamePlayed + 1
  let endTime = timerStop()
  document.querySelector('.container').style.display = 'none'
  document.getElementById('disable-game').style.display = 'block'
  document.getElementById('end-menu').style.display = 'block'
  document.getElementById('score__score').innerHTML = endTime

  let restartGame = document.getElementById('end-menu__restart')
  restartGame.addEventListener('click', gameStart)
}

function isGameOver () {
  if (matchedCards.length === 16) {
    window.setTimeout(function () {
      gameOver()
      console.log('GAME OVER')
    }, 100)
  }
}

function rotateCard (e) {
  let id = e.target.id
  let element = e.target

  // on clikc - open card (if it is not already opened)
  if (openedCards.includes(id) === false || matchedCards.includes(id) === false) {
    openedCards.push(id)
    element.classList.add('show')
    element.classList.add('open')
    element.classList.add('disable')
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
let startGame = document.getElementById('start-menu__start')
startGame.addEventListener('click', gameStart)

// prepare everything for the game
let memoryCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']
let matchedCards = []
let openedCards = []
let moves = 0
let sec = 0
let min = 0
let t
let gamePlayed = 0

memoryCards = shuffle(memoryCards)
// console.log(memoryCards)
createCards()

// add eventListeners for clicking on cards + restartButton
var cardsListener = document.querySelectorAll('.card')
for (let i = 0; i < cardsListener.length; i++) {
  cardsListener[i].addEventListener('click', rotateCard)
}
document.querySelector('.restart').addEventListener('click', restartGame)
