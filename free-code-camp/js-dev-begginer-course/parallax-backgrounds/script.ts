const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;

const backGroundLayer1 = new Image()
backGroundLayer1.src = './backgroundLayers/layer-1.png'
const backGroundLayer2 = new Image()
backGroundLayer2.src = './backgroundLayers/layer-2.png'
const backGroundLayer3 = new Image()
backGroundLayer3.src = './backgroundLayers/layer-3.png'
const backGroundLayer4 = new Image()
backGroundLayer4.src = './backgroundLayers/layer-4.png'
const backGroundLayer5 = new Image()
backGroundLayer5.src = './backgroundLayers/layer-5.png'

class Layer {
	x: number;
	y: number;
	width: number;
	height: number;
	x2: number;
	image: HTMLImageElement;
	speedModifier: number;
	speed: number;

	constructor(image: HTMLImageElement, speedModifier: number) {
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 700;
		this.x2 = this.width;
		this.image = image;
		this.speedModifier = speedModifier;
		this.speed = gameSpeed * this.speedModifier;
	}
	update(): void {
		this.speed = gameSpeed * this.speedModifier;
		if (this.x <= -this.width) {
			this.x = this.width + this.x2 - this.speed;
		}
		if (this.x2 <= -this.width) {
			this.x2 = this.width + this.x - this.speed;
		}
		this.x = Math.floor(this.x - this.speed)
		this.x2 = Math.floor(this.x2 - this.speed)
	}
	draw(): void {
		ctx?.drawImage(this.image, this.x, this.y, this.width, this.height)
		ctx?.drawImage(this.image, this.x2, this.y, this.width, this.height)
	}
}

const layer1: Layer = new Layer(backGroundLayer1, 0.2)
const layer2: Layer = new Layer(backGroundLayer2, 0.4)
const layer3: Layer = new Layer(backGroundLayer3, 0.6)
const layer4: Layer = new Layer(backGroundLayer4, 0.8)
const layer5: Layer = new Layer(backGroundLayer5, 1)

const gameObjects: Layer[] = [layer1, layer2, layer3, layer4, layer5]

const animateGameObjects = (gameObjectsArray: Layer[]): void => {
	gameObjectsArray.forEach((gameObject: Layer) => {
		gameObject.update()
		gameObject.draw()
	})
}


function animate() {
	ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	animateGameObjects(gameObjects)
	requestAnimationFrame(animate)
}
animate()
