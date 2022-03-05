const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/*for restart button  */
let restartArray = [];
let restart_game = document.querySelector("#restart-game");

//count moves
let countedMoves = document.querySelector(".countedMoves");
let moves =[];

//record moves
let record_moves = document.querySelector(".record");
let recorded_moves;

//background music
let backgroundMusic = new Audio("narutorais.mp3");
let start_game = document.querySelector("#start-game");

let flip_card =  new Audio("move.mp3");


function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

   this.classList.add("flip");

   if(!hasFlippedCard){
       //first click
       hasFlippedCard = true;
       firstCard = this;
       return;
   }
       //second click
    
       secondCard = this;
       
       checkForMatch();
   
}


function checkForMatch(){
    let isMath = firstCard.dataset.framework === secondCard.dataset.framework;
    isMath ? disableCard() : unFlipCard(); 
    
    countMoves();
}

function disableCard(){
    firstCard.removeEventListener("click",flipCard);
        secondCard.removeEventListener("click",flipCard);
        resetBoard();
        restartFunction();
}

function unFlipCard(){
    lockBoard = true;

    setTimeout(() =>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
        },1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click",flipCard));

//restart game
function restartFunction(){
    restartArray.push("plus one");
        if(restartArray.length == 6){
           setTimeout(() => restart_game.style.display = "initial",1500);            
        }
    

}

//refresh restart function
function restartGame(){
    window.location.reload(true);
}

//Start Game
function startGame(element){
    element.style.display = "none";
    backgroundMusic.play();
    
}

//play pause music
function musicPlayPause(){
  return myMusic.paused ? myMusic.play() : myMusic.pause();
}

//count-moves
function countMoves(){
    console.log("counting moves");
    moves.push("a move");
    countedMoves.innerHTML = moves.length;

}

//fullscreen mode
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
  
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        document.getElementById("fullscreen").src="fullscreenexit.png";
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("fullscreen").src="fullscreen.png";
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  
  document.getElementById('fullscreen').addEventListener('click', function() {
    toggleFullscreen();
  });
