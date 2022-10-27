function gameStart() {
    //alert();
    readMap();
    document.addEventListener('keydown', inputManager);
}

function readMap() {
    let rowNumber = 0;
    for (let i = 0; i < 64; i++) {
        //Create the div element
        let div = document.createElement('div');
        //Give it properties like id and class(es)
        div.id = (i % 8) + '-' + rowNumber;
        div.classList.add('square');
        //------ Don't bother with this seection. It's just for layout of the chessboard
        if (rowNumber % 2 == 1) {
            if (i % 2 == 0) {
                div.classList.add('light');
            }
            else {
                div.classList.add('dark');
            }
        }
        else {
            if (i % 2 == 0) {
                div.classList.add('dark');
            }
            else {
                div.classList.add('light');
            }
        }
        //--------------------------------------------------
        if (i == 30) {
            div.classList.add('player');
        }
        //Attach to game-area element
        document.getElementById('game-area').append(div);
        if ((i + 1) % 8 == 0) {
            rowNumber++;
        }
    }
}

function inputManager(e) {
    e.preventDefault();
    if (e.key == 'ArrowUp') {
        movePlayer('up'); return;
    }
    if (e.key == 'ArrowDown') {
        movePlayer('down'); return;
    }
    if (e.key == 'ArrowRight') {
        movePlayer('right'); return;
    }
    if (e.key == 'ArrowLeft') {
        movePlayer('left'); return;
    }
}

function movePlayer(direction) {
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

    let divCurrPlayerPos = document.getElementsByClassName('player')[0];
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
    divNextPlayerPos.classList.add('player');
    divCurrPlayerPos.classList.remove('player');
}