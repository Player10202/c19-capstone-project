var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  ghost=createSprite(200,200,10,10)
  ghost.addImage(ghostImg)
ghost.scale=0.4
spookySound.loop()
}

function draw() {
  background(200);
if(gameState==="play"){
  drawSprites()
  if(tower.y > 400){
      tower.y = 300
    }
if(keyDown("space")){
  ghost.velocityY=-10
}
ghost.velocityY=ghost.velocityY+0.5
if(keyDown("left")){
  ghost.x=ghost.x-3
}
if(keyDown("right")){
  ghost.x=ghost.x+3
}
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0
}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  gameState="end"
}
    spawndoors()
}
else if(gameState==="end"){
  background("black")
  textSize(45)
  fill("red")
  text("Game Over",150,300)
}


    
}
function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50,10,20)
    door.addImage(doorImg)
    door.velocityY=1;
    door.x=Math.round(random(120,400))
    climber=createSprite(door.x,10,10,10)
    climber.addImage(climberImg)
    climber.velocityY=1
    invisibleBlock=createSprite(door.x,15,climber.width,2)
    invisibleBlock.velocityY=1
doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
ghost.depth=door.depth+1

  }
  
}