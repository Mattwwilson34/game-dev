
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage: HTMLImageElement = new Image();
playerImage.src = 'shadow_dog.png'

const spriteWidth: number = 575;
const spriteHeight: number = 523
let gameFrame: number = 0;
const staggerFrames: number = 5;


interface AnimationState {
	name: string;
	frames: number;
}
// hardcoded animation states
const animationStates: AnimationState[] = [
	{
		name: 'idle',
		frames: 7,
	},
	{
		name: 'jump',
		frames: 7,
	},
	{
		name: 'fall',
		frames: 7,
	},
	{
		name: 'run',
		frames: 9,
	},

	{
		name: 'dizzy',
		frames: 11,
	},

	{
		name: 'sit',
		frames: 4,
	},
	{
		name: 'roll',
		frames: 7,
	},
	{
		name: 'bite',
		frames: 7,
	},
	{
		name: 'ko',
		frames: 12,
	},
	{
		name: 'gethit',
		frames: 4,
	},
]

type Loc = {
	x: number;
	y: number;
}
type Frames = {
	loc: Loc[];
}
type SpriteContainer = {
	[index: string]: Frames;
}

let sprites: SpriteContainer = {};

// animation frame generator
animationStates.forEach((animation, index) => {
	let frames: Frames = {
		loc: [],
	}
	for (let j = 0; j < animation.frames; j++) {
		let x: number = j * spriteWidth;
		let y: number = index * spriteHeight;
		frames.loc.push({ x, y })
	}
	sprites[animation.name] = frames;
})

let animationState: string = 'idle';

const dropDown = document.getElementById('animations') as HTMLSelectElement;

const onChange = (event: Event) => {
	const target = event.target as HTMLSelectElement
	animationState = target.value;
	console.log(animationState);
}

dropDown.addEventListener('change', onChange);

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position: number = Math.floor(gameFrame / staggerFrames) % sprites[animationState].loc.length
	let frameX = spriteWidth * position
	let frameY = sprites[animationState].loc[position].y;

	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	gameFrame++;
	requestAnimationFrame(animate);
}

animate();
