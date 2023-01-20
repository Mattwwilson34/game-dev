"use strict";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width = 600;
var CANVAS_HEIGHT = canvas.height = 600;
var playerImage = new Image();
playerImage.src = 'shadow_dog.png';
var spriteWidth = 575;
var spriteHeight = 523;
var gameFrame = 0;
var staggerFrames = 5;
// hardcoded animation states
var animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 4
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'gethit',
        frames: 4
    },
];
var sprites = {};
// animation frame generator
animationStates.forEach(function (animation, index) {
    var frames = {
        loc: []
    };
    for (var j = 0; j < animation.frames; j++) {
        var x = j * spriteWidth;
        var y = index * spriteHeight;
        frames.loc.push({ x: x, y: y });
    }
    sprites[animation.name] = frames;
});
var animationState = 'idle';
var dropDown = document.getElementById('animations');
var onChange = function (event) {
    var target = event.target;
    animationState = target.value;
    console.log(animationState);
};
dropDown.addEventListener('change', onChange);
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var position = Math.floor(gameFrame / staggerFrames) % sprites[animationState].loc.length;
    var frameX = spriteWidth * position;
    var frameY = sprites[animationState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=script.js.map