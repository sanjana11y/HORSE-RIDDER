
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg , backg;
var horseRider ;
var ground ;
var edges ;
var hImg,h2Img ;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var obstaclesGroup;
var gameState="play"
var score = 0;
var gameOver ;
var game;
var startPage;
var startImg;




function preload()
{
	bg = loadImage("images/background.jpg")
	obstacle1 = loadImage("images/obstacle1.png")
	obstacle2 = loadImage("images/obstacle2.png")
	obstacle3 = loadImage("images/obstacle3.png")
	obstacle4 = loadImage("images/hurdle2 (1).png")
  obstacle5 = loadImage("images/obstacle4.png")
    hImg = loadAnimation("images/h1.png","images/h2.png","images/h3.png","images/h4.png","images/h5.png","images/h6.png")
    h2Img=loadImage("images/h1.png")
    gameOver = loadImage("images/gameOver.png")
    startImg=loadImage("images/download.jpg")
  
}

function setup() {
	createCanvas(1200,600);


	engine = Engine.create();
	world = engine.world;
  
	//Create the Bodies Here.
backg= createSprite(600,300,1200,600);
backg.addImage("bg", bg);
backg.scale=4;
horseRider= createSprite(450,520,50,50);
horseRider.addAnimation("h1",hImg)
//horseRider.debug=true
horseRider.addImage("h2Img",h2Img)
ground= createSprite(600,550,1200,5);
ground.visible=false;
game = createSprite(600,250);
game.addImage("gameOver" , gameOver);
game.visible=false


obstaclesGroup=new Group();
	//Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("lightblue");
  if(gameState==="start"){
    startPage=createSprite(600,300,1200,600);
    startPage.addImage("startImg",startImg)
    startPage.scale=2
    fill("pink")
    textSize(20)
    text("press S to start",300,600)
    if(keyDown("S")){
     gameState="play"
    }
  }
  
  
  if(gameState==="play"){
    score+=Math.round(getFrameRate()/50)
    backg.velocityX=-3
    if(backg.x<559){
      backg.x=600
    }
    if(keyDown("UP_ARROW")){
      horseRider.velocityY=-5;
  
    }
    horseRider.velocityY+=0.6;
    spawnObstacles();
    if(horseRider.isTouching(obstaclesGroup)){
      gameState="end"
    }
  }
  
 
 
  horseRider.collide(ground);
  edges=createEdgeSprites();
  horseRider.collide(edges);
  
 
  drawSprites();
  fill("pink")
  textSize(20)
  text("HORSE RIDDER",700,50)

  fill ("black");
  textSize(30)
  text("SCORE :"+score,700,100)
  if(gameState==="end"){
    backg.velocityX=0
    ground.velocityX=0
    game.visible=true
    obstaclesGroup.setVelocityXEach(0);

    score=0;
    horseRider.velocityY=0
    horseRider.changeImage("h2Img",h2Img)
    //fill ("black")
   // textSize(20)
    //text("GameOver",600,300)
  

  }
 
  
 
}

function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1200,520,30,40);

    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,70)
    obstacle.velocityX = -3
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
             break;
     // case 6: obstacle.addImage(obstacle6);
             // break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



