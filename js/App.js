var boxNum = 0 
var goaledBlock = 0
var goalNum = 0

function runGame() {
    
    mapRandomizer()
    
    
    
    document.addEventListener('keydown', playerInputManager);
}

function mapRandomizer () {
    
    let tilesetArray = [tileMap01, tileMap02, tileMap03]
    let random = tilesetArray[Math.floor(Math.random() * tilesetArray.length)] 
    
    return createMap(random)
    
}

function createMap(random) {
    
    for (let row = 0; row < random.height; row++) {
        for (let column = 0; column < random.width; column++) {
        
            let div = document.createElement("div")
            div.id = column+ "-" +row
            
            div.classList.add("tile")

            if (random.mapGrid[row][column][0] == "P")
            {
                div.classList.add("entity-player")
            } 
            else if(random.mapGrid[row][column][0] == "W") {
                div.classList.add("tile-wall")
            }
            else if(random.mapGrid[row][column][0] == "B") {
                div.classList.add("entity-block")

            }
            else if(random.mapGrid[row][column][0] == "G") {
                div.classList.add("tile-goal")

            }
            document.getElementById("game_map").append(div); 
        }
    }
}

function playerInputManager(e) {
    e.preventDefault();
    if (e.key == 'ArrowUp') {
        playerMove('up'); return; 
    }
    if (e.key == 'ArrowDown') {
        playerMove('down'); return;
    }
    if (e.key == 'ArrowRight') {
        playerMove('right'); return;
    }
    if (e.key == 'ArrowLeft') {
        playerMove('left'); return;
    }
}


function playerMove(direction) {

    
    let dirModifierX = 0;
    let dirModifierY = 0;
    if (direction == 'up') {
        dirModifierY = -1;
        
    }
    if (direction == 'down') {
        dirModifierY = 1;
        
    }
    if (direction == 'right') {
        dirModifierX = 1;
        
    }
    if (direction == 'left') {
        dirModifierX = -1;
        
    }

    let divCurrPlayerPos = document.getElementsByClassName('entity-player')[0];
    // console.log(divCurrPlayerPos);
    let currPlayerPos = divCurrPlayerPos.id;
    console.log("currentPos " +currPlayerPos);
    let playerXcoord = currPlayerPos.split('-')[0];
    let playerYcoord = currPlayerPos.split('-')[1];

    let nextPlayerPosX = Math.floor(playerXcoord) + dirModifierX;
    let nextPlayerPosY = Math.floor(playerYcoord) + dirModifierY;

    //Find the target div
    let nextPosCoords = nextPlayerPosX + '-' + nextPlayerPosY
    let divNextPlayerPos = document.getElementById(nextPosCoords);
    console.log("nextPos " + nextPosCoords);

    //Move the chess piece by removing class from current position and adding same player class to next position
    if (divNextPlayerPos.classList.contains("tile-wall")) {
        return 
    } 

    if (divNextPlayerPos.classList.contains('entity-block') || divNextPlayerPos.classList.contains('entity-block-goal')) {
        
        let nextTwoSquaresAheadPosX = Math.floor(playerXcoord) + (dirModifierX * 2) ;
        let nextTwoSquaresAheadPosY = Math.floor(playerYcoord) + (dirModifierY * 2);
        let divNextTwoSquaresAheadPosCoords = nextTwoSquaresAheadPosX + '-' + nextTwoSquaresAheadPosY
        let divTwoSquaresAheadPos = document.getElementById(divNextTwoSquaresAheadPosCoords);


     

        /* Win Condition */
        if (divNextPlayerPos.classList.contains("entity-block") && divTwoSquaresAheadPos.classList.contains('tile-goal')) {

            divTwoSquaresAheadPos.classList.remove('tile-goal');
            divTwoSquaresAheadPos.classList.add('entity-block-goal');
            divNextPlayerPos.classList.remove('entity-block');
            divNextPlayerPos.classList.add('entity-player');
            divCurrPlayerPos.classList.remove('entity-player');
        }

        if (divNextPlayerPos.classList.contains("entity-block-goal") && divTwoSquaresAheadPos.classList.contains('tile-goal')) {

            divTwoSquaresAheadPos.classList.remove('tile-goal');
            divTwoSquaresAheadPos.classList.add('entity-block-goal');
            divNextPlayerPos.classList.remove('entity-block-goal');
            divNextPlayerPos.classList.add('tile-goal');
            divNextPlayerPos.classList.add('entity-player');
            divCurrPlayerPos.classList.remove('entity-player');
        }

        
        if (divNextPlayerPos.classList.contains('entity-block') && divTwoSquaresAheadPos.classList.contains('entity-block')) {
        
            return
            }
    
            if (divNextPlayerPos.classList.contains('entity-block-goal') && divTwoSquaresAheadPos.classList.contains('entity-block-goal')) {
            
                return
                }
            

        if (divNextPlayerPos.classList.contains('entity-block') && !divTwoSquaresAheadPos.classList.contains('tile-wall')) {

            divTwoSquaresAheadPos.classList.add('entity-block');
            divNextPlayerPos.classList.remove('entity-block');            
            divNextPlayerPos.classList.add('entity-player');
            divCurrPlayerPos.classList.remove('entity-player');
        }

        if(divNextPlayerPos.classList.contains('entity-block-goal') && !divTwoSquaresAheadPos.classList.contains('tile-wall')) {

            divTwoSquaresAheadPos.classList.add('entity-block');
            divNextPlayerPos.classList.remove('entity-block-goal');            
            divNextPlayerPos.classList.add('tile-goal');
            divNextPlayerPos.classList.add('entity-player');
            divCurrPlayerPos.classList.remove('entity-player');
        }
       
    }

    else {
        divCurrPlayerPos.classList.remove('entity-player');
        divNextPlayerPos.classList.add('entity-player');
        return
    }

    blockNum = document.getElementsByClassName('entity-block').length
    goalNum = document.getElementsByClassName('tile-goal').length
    goaledBlock = document.getElementsByClassName('entity-block-goal').length
  
    if (goalNum == 0) {
        win()
    }
}

  


function win() {

    document.getElementById('game_title').innerHTML = "You win hahaha!"
}
