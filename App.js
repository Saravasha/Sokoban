

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
            div.id = row+ "-" +column
            
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
        dirModifierX = -1;
    }
    if (direction == 'left') {
        dirModifierX = 1;
    }

    let divCurrPlayerPos = document.getElementsByClassName('entity-player')[0];
    // console.log(divCurrPlayerPos);
    let currPlayerPos = divCurrPlayerPos.id;
    console.log(currPlayerPos);
    let playerXcoord = currPlayerPos.split('-')[0];
    let playerYcoord = currPlayerPos.split('-')[1];

    let nextPlayerPosX = Math.floor(playerXcoord) + dirModifierX;
    let nextPlayerPosY = Math.floor(playerYcoord) + dirModifierY;

    //Find the target div
    let nextPosCoords = nextPlayerPosX + '-' + nextPlayerPosY
    let divNextPlayerPos = document.getElementById(nextPosCoords);

    //Move the chess piece by removing class from current position and adding same player class to next position
    divNextPlayerPos.classList.add('entity-player');
    divCurrPlayerPos.classList.remove('entity-player');
}