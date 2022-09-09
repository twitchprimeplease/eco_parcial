const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });
let mouseDown = 'and Another one'

let character = {
    x: 0,
    y: 0
};
let whiteMouse = {
    x: 50,
    y: 50
};
let speed = 10;

let score = 0;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    character.x = windowWidth / 2;
    character.y = windowHeight / 2;
}

function draw() {
    background(0, 50);
    textSize(64);
    text('🐍', character.x - 25, character.y);
    textSize(24);
    text('🐁', whiteMouse.x, whiteMouse.y);
    eatsMouse();
}


function eatsMouse() {
    if (dist(character.x, character.y, whiteMouse.x, whiteMouse.y) < 50) {
        putMouseRandomPosition();
        snakeEated();
        score ++;
        sendScore(score);
    }
}

function putMouseRandomPosition() {
    whiteMouse.x = random(50, windowWidth - 50);
    whiteMouse.y = random(50, windowHeight - 50);
}

/*___________________________________________

1) Include the socket method to listen to events and change the character position.
You may want to use a Switch structure to listen for up, down, right and left cases.
_____________________________________________ */

socket.on('direction-display',message =>{
    let {direction} = message;

    switch(direction){
        case 'UP':
            character.y = character.y - 20
           break; 
    
        case 'DOWN':
            character.y = character.y + 20
            break;

        case 'RIGHT':
            character.x = character.x + 20
                break;
        case 'LEFT':
            character.x = character.x - 20
                break;
        }
})

/*___________________________________________

2) Include the fetch method to post each time the snake eats a mouse
_____________________________________________ */

function snakeEated(){
    
fetch(URL, {
    method:'POST',
    body: JSON.stringify(mouseDown),
    headers: {
        'Content-type': 'application/json'
    }
}).then(response=> response.json())
.then(sonsole.log('lET s gooooooooo', data))
.catch(error => console.log(error))

}

function sendScore(message){
    
fetch(`http://${window.location.hostname}:5050/score`, {
    method:'POST',
    body: JSON.stringify(message),
    headers: {
        'Content-type': 'application/json'
    }
}).then(response=> response.json())
.then(console.log('lET s gooooooooo', data))
.catch(error => console.log(error))
}