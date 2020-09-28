const Engine = Matter.Engine;
const World = Matter.World;
const  Events = Matter.Events;
const  Bodies = Matter.Bodies;
 
var particles;
var plinkos;
var divisions, divisionHeight;
var score, bucketScore, turn;
var gameState;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  plinkos = [];

  divisions = [];
  divisionHeight = 300;

  score = 0; 
  bucketScore = [];
  turn = 0;

  gameState = 1;

  ground = new Ground(width/2,height,width,20);


  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

    for (var j = 75; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }

    for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

  for(var i = 1; i < divisions.length; i++){
    var rand = round(random(1,4));
    rand *= 50;
    bucketScore.push(rand);
  }

}
 


function draw() {
  background("black");

  Engine.update(engine);

  textAlign(CENTER);

  if(gameState == 1){
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }

    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }

    if(turn>0&&particle){
      particle.display();
      for(var i = 1; i < divisions.length-1; i++){
        if(particle.body.position.x>divisions[i-1].body.position.x&&particle.body.position.x<divisions[i].body.position.x&&particle.body.position.y>760){
          score += bucketScore[i-1];
          particle = null;
        }
        if(particle == null){
          break;
        }
      }
    }

    textSize(20);

    for(var i = 0; i < divisions.length-1; i++){
      text(bucketScore[i],(divisions[i+1].body.position.x+divisions[i].body.position.x)/2,785);
    }
    
    text("Score: "+score,50,30);
    text("Turns left: "+(5-turn),180,30);

    if(turn>5){
      gameState = 0;
    }
  }

  if(gameState == 0){
    textSize(50);
    text("GAME OVER",400,300);
    text("REFRESH PAGE TO TRY AGAIN",400,500);
  }
}

function mousePressed(){
  if(gameState = 1){
    turn++;
    particle = new Particle(mouseX,10,10);
  }
}