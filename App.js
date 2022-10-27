

function runGame() {
    readMap()
    // alert("running") 
    document.addEventListener('keydown', playerInputManager);
}

function readMap() {
    
    for (let row = 0; row < tileMap01.height; row++) {
        for (let column = 0; column < tileMap01.width; column++) {
        
        
            // console.log("Row: " + row + "Column: "+ column);  
            let div = document.createElement("div")
            div.id = column+ "-" +row
            
            div.classList.add("tile")

            if (tileMap01.mapGrid[row][column][0] == "P")
            {
                div.classList.add("entity-player")

            } 
            else if(tileMap01.mapGrid[row][column][0] == "W") {
                div.classList.add("tile-wall")

            }
            else if(tileMap01.mapGrid[row][column][0] == "B") {
                div.classList.add("entity-block")

            }

            else if(tileMap01.mapGrid[row][column][0] == "G") {
                div.classList.add("tile-goal")

            }
            else  {
                div.classList.add("tile-space")

            }

            document.getElementById("gamemap").append(div); 

        }
    }
}

function playerInputManager(e) {
    e.preventDefault();
    // console.log(e);
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
    // console.log(direction);
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
    // console.log("X: "  +dirModifierX);
    // console.log("Y: " + dirModifierY);

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
    if (divNextPlayerPos.classList.contains("tile-space")) {
        
        divCurrPlayerPos.classList.remove('entity-player');
        divNextPlayerPos.classList.add('entity-player');
        divCurrPlayerPos.classList.add('tile-space');
        return
    
    }
    if (divNextPlayerPos.classList.contains('entity-block')){
    
        let nextTwoSquaresAheadPosX = Math.floor(playerXcoord) + (dirModifierX * 2) ;
        let nextTwoSquaresAheadPosY = Math.floor(playerYcoord) + (dirModifierY * 2);
        let divNextTwoSquaresAheadPosCoords = nextTwoSquaresAheadPosX + '-' + nextTwoSquaresAheadPosY
        let divTwoSquaresAheadPos = document.getElementById(divNextTwoSquaresAheadPosCoords);

        if (divTwoSquaresAheadPos.classList.contains('tile-space')) 
        {
            divCurrPlayerPos.classList.remove('entity-player');
            divNextPlayerPos.classList.add('entity-player');
            divCurrPlayerPos.classList.add('tile-space')
            
            divNextPlayerPos.classList.remove('entity-block');
            divTwoSquaresAheadPos.classList.add('entity-block');
            divNextPlayerPos.classList.add('tile-space');
            
            

        } 



    }
}