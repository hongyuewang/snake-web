// Global variables
let direction = 'right';
let snakeBody = [];

function checkSupported() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        // Canvas is supported on this browser
        ctx = canvas.getContext('2d');

        // Sets fill color to lime green
        ctx.fillStyle = "#32CD32";

        // Current position of the snake's head (x, y)
        this.currentPosition = {'x':50, 'y':50};

        // Sets the grid dimensions as one value
        this.gridSize = 10;

        // Moves snake every 100 milliseconds
        setInterval(moveSnake,100);

        snakeLength = 3;
        makeFoodItem();
        drawSnake();

        document.onkeydown = function(event) {
            var keyCode;

            if (event === null) {
                keyCode = window.event.keyCode;
            } else {
                keyCode = event.keyCode;
            }

            switch(keyCode) {
                // left
                case 37:
                    moveLeft();
                    break;

                // up
                case 38:
                    moveUp();
                    break;

                // right
                case 39:
                    moveRight();
                    break;

                // down
                case 40:
                    moveDown();
                    break;

                // WASD keys

                // left
                case 65:
                    moveLeft();
                    break;

                // up
                case 87:
                    moveUp();
                    break;

                // right
                case 68:
                    moveRight();
                    break;

                // down
                case 83:
                    moveDown();
                    break;

                default:
                    break;
            }
        }

    } else {
        // Canvas is not supported on this browser
        alert("Unfortunately, your browser does not support the canvas"
        + " tag. Please use any web browser other than Internet Explorer."
        + " Seriously. Why are you using Internet Explorer?");
    }
}

function drawSnake() {
    snakeBody.push([currentPosition['x'], currentPosition['y']]);
    ctx.fillStyle = "#32CD32";
    ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
    if (snakeBody.length > snakeLength) {
        var itemToRemove = snakeBody.shift();
        ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
    }

    if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] ==
    suggestedPoint[1]) {
        makeFoodItem();
        snakeLength += 1;
        //updatescore
    }
}

function moveSnake() {
    switch(direction) {
        case 'up':
            moveUp();
            break;

        case 'down':
            moveDown();
            break;

        case 'left':
            moveLeft();
            break;

        case 'right':
            moveRight();
            break;

    }
}

function leftPosition() {
    return currentPosition['x'] - gridSize;
}

function rightPosition() {
    return currentPosition['x'] + gridSize;
}

function upPosition() {
    return currentPosition['y'] - gridSize;
}

function downPosition() {
    return currentPosition['y'] + gridSize;
}

function moveLeft() {
    if (leftPosition() >= 0) {
        executeMove('left', 'x', leftPosition());
    } else {
        whichWayToGo('y');
    }
}

function moveRight() {
    if (rightPosition() < canvas.width) {
        executeMove('right', 'x', rightPosition());
    } else {
        whichWayToGo('y');
    }
}

function moveUp() {
    if (upPosition() >= 0) {
        executeMove('up', 'y', upPosition());
    } else {
        whichWayToGo('x');
    }
}

function moveDown() {
    if (downPosition() < canvas.height) {
        executeMove('down', 'y', downPosition());
    } else {
        whichWayToGo('x');
    }
}

function executeMove(dirValue, axisType, axisValue) {
    direction = dirValue;
    currentPosition[axisType] = axisValue;
    drawSnake();
}

// Option 1: Snake changes direction when it hits a wall
function whichWayToGo(axisType) {
    if (axisType == 'x') {
        way = (currentPosition['x'] > canvas.width / 2 ) ? moveLeft() :
        moveRight();
    } else {
        way = (currentPosition['y'] > canvas.height / 2) ? moveUp() :
        moveDown();
    }
}

function makeFoodItem() {
    // Not declared, therefore it is a global variable
    suggestedPoint = [Math.floor(Math.random() * (canvas.width/gridSize)) *
    gridSize, Math.floor(Math.random() * (canvas.height/gridSize)) * gridSize];
    if (snakeBody.some(hasPoint)) {
        makeFoodItem();
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
    }
}

function hasPoint(element, index, array) {
    return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}
