let direction = 'right'; // Global variable
function checkSupported() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        // Canvas is supported on this browser
        ctx = canvas.getContext('2d');

        // Sets fill color to red
        ctx.fillStyle = "rgb(200,0,0)";

        // Sets variables
        const x = 50;
        const y = 50;
        const width = 10;
        const height = 10;

        // Current position of the snake's head (x, y)
        this.currentPosition = {'x':50, 'y':50};

        // Draws a square with parameters set by the variables above
        ctx.fillRect(x, y, width, height);

        // Sets the grid dimensions as one value
        this.gridSize = 10;

        // Moves snake every 100 milliseconds
        setInterval(moveSnake,100);

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
  ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
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
