//Create new game board
function renderBoard(numberOfFields) {
    const fields = [];
    const buttons = [];
    const buttonRow = document.querySelector('.row');
    for (let i = 0; i < numberOfFields; i++) {
        //Create button which is a field
        const button = document.createElement('button');
        buttonRow.appendChild(button);
        buttons.push(button);
        button.addEventListener('click', () => openField(buttons, fields, i));
        //Handle right-click event
        button.addEventListener('contextmenu', (event) => {
            //To disable right-click menu
            event.preventDefault();
            toggleFlag(buttons, fields, i);
            return false;
        });
        //Create field itself
        const field = new Field();
        fields.push(field);
    }
    calculateBombs(fields);
}

function openField(buttons, fields, i) {
    //If flag is placed or field is open we ignore this field
    if (fields[i].hasFlag || fields[i].isOpen) {
        return;
    }
    //After click disable this field
    fields[i].isOpen = true;
    if (fields[i].hasBomb) {
        buttons[i].innerHTML = '<img src="images/bomb.png">';
        alert('Boom');
        //TODO: handle game over
    } else {
        buttons[i].innerText = fields[i].bombs;
    }
}

//Place/unplace flag
function toggleFlag(buttons, fields, i) {
    if (fields[i].hasFlag) {
        buttons[i].innerHTML = '';
        fields[i].hasFlag = false;
    } else {
        buttons[i].innerHTML = '<img src="images/flag.png">';
        fields[i].hasFlag = true;
    }
}

function calculateBombs(fields) {
    for (let i = 0; i < fields.length; i++) {
        if (i == 0) {
            fields[0].bombs = fields[1].hasBomb ? 1 : 0;
        } else if (i == fields.length - 1) {
            fields[i].bombs = fields[i - 1].hasBomb ? 1 : 0;
        } else {
            if (fields[i - 1].hasBomb && fields[i + 1].hasBomb) {
                fields[i].bombs = 2;
            } else if (fields[i - 1].hasBomb || fields[i + 1].hasBomb) {
                fields[i].bombs = 1;
            } else {
                fields[i].bombs = 0;
            }
        }
    }
}

renderBoard(10);