// Creating variables
var canvas;

var boyImg, girlImg;

var player;

var bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

var bitterImg,coronaImg,dress1,dress2,fridgeImg,appleImg,bananaImg;

var basilImg, grapesImg, jeans1, jeans2 , lionImg, neemImg, orangeImg, rockImg;

var shirt1 , shirt2, shoes1, sofa, tv, watermelon;

var maskImg , moneyBagImg , restartImg, sanitizerImg ,heart;

var obstaclesGroup, money, moneyBag,restart;

var girl_stopped, boy_stopped;   

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var invisibleGround;

var state = "house";


function preload(){

  // Loading all the images
  bg1 = loadAnimation("homei.png");

  bg2 = loadAnimation("horror.jpg");

  bg3 = loadAnimation("forest.jpg");

  bg4 = loadAnimation("city1.jpg");

  bg5 = loadAnimation("cityevening.jpg");

  bg6 = loadAnimation("market1.jpg");

  bg7 = loadAnimation("market2.jpg");

  boyImg = loadAnimation("boy1.png", "boy2.png", "boy3.png", "boy4.png", "boy5.png", "boy6.png", "boy7.png");
  
  girlImg = loadAnimation("girl1.png","girl2.png", "girl3.png", "girl4.png", "girl5.png", "girl6.png", "girl7.png")
  
  girl_stopped = loadAnimation("girl11.png");

  boy_stopped = loadAnimation("boy11.png");
  //adding obstacles images which are found in house and market
  coronaImg = loadImage("corona.png");
  bitterImg = loadImage("bitter.png");
  dress1 = loadImage("dress1.png");
  dress2 = loadImage("dress2.png");
  jeans1 = loadImage("jeans1.png");
  jeans2 = loadImage("jeans2.png");
  shirt1 = loadImage("shirt1.png");
  shirt2 = loadImage("shirt2.png");
  shoes1 = loadImage("shoes1.png");
  sofa = loadImage("sofa.png");
  tv = loadImage("tv.png");
  fridgeImg = loadImage("fridge.png");

  //images in jungle and market 
  appleImg = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  basilImg = loadImage("basil.png");
  grapesImg = loadImage("grapes.png");
  watermelon = loadImage("watermelon.png");
  neemImg = loadImage("neem.png");
  orangeImg = loadImage("orange.png");
  lionImg = loadImage("lion.png");
  rockImg = loadImage("rock.png");

  //loading important images for game
  moneyBagImg = loadImage("moneyBag.png");
  maskImg = loadImage("mask.png");
  restartImg = loadImage("restart.png");
  sanitizerImg = loadImage("sanitizer1.png");
  heart = loadImage("heart.png");



}
function setup() {
 canvas = createCanvas(800,600);

 obstaclesGroup = new Group();

 coronaGroup = new Group();

 moneyGroup = new Group();

 obstaclesGroup1 = new Group();
 
 
 money = 0;


 

//adding animation for backgrounds
 bg = createSprite(300,300);
 bg.addAnimation("1", bg1);
 bg.addAnimation("2", bg2);
 bg.addAnimation("3", bg3);
 bg.addAnimation("4", bg4);
 bg.addAnimation("5", bg5);
 bg.addAnimation("6", bg7);

 bg.velocityX = -2;

 //creating player sprite
 player = createSprite(50,400);
 player.addAnimation("player", girlImg);
 player.scale=0.6;

 //restart 
 restart = createSprite(400,300);
 restart.addImage(restartImg);
 restart.scale = 0.5;
 restart.visible = false;

 //invisible Ground
 invisibleGround = createSprite(400, 550,800,10);
 invisibleGround.visible = false;

 //Money Bag
 moneyBag = createSprite(580,40);
 moneyBag.addImage(moneyBagImg);
 moneyBag.scale = 0.2;
 money = 5000;

}

function draw() {
        
//gameState is PLAY
if(gameState === PLAY){
      if(keyDown("space") && player.y >= 159){
        player.velocityY = -12;
      } 

      player.velocityY = player.velocityY + 0.8

      if(invisibleGround.x < 0){
              invisibleGround.x = invisibleGround.width/2;
      }
      if(bg.x < 0){
       bg.x = bg.width/2;
}

      player.collide(invisibleGround);

      //Calling out the functions
   
      corona();
      lottery();
      changeBg();
   


      if(state = "house"){
        spawnObstacles(); 
      }
      else if(state = "horror"){
        spawnObstacles();
      }
      else if(state = "forest"){
        spawnObstacles();
      }
      else if(state = "citym"){
        spawnObstacles();
      }
      else if(state = "citye"){
        spawnObstacles();
      }
      else if(state = "Market1"){
        spawnObstacles1();
      }
      else if(state = "Market2"){
        spawnObstacles1();
      }


     //If corona is touching the  obstacles 
      if(coronaGroup.isTouching(player)){
              coronaGroup.destroyEach();
              money = money-500;
              sanitizer();
              mask();
      }

      //If money is 0 then gameState should be END
      if(money === 0){
              gameState = END;
      }
      
      //If obstacles Group is touching the player
      if(obstaclesGroup.isTouching(player)){
              obstaclesGroup.destroyEach();
                var bag = Math.round(random(0,1000))
                money = money-bag;
                console.log(bag);
              
      }

      //If moneyGroup is touching the player
      if(moneyGroup.isTouching(player)){
              moneyGroup.destroyEach();
              var rand = Math.round(random(2000,10000))
              money = money + rand;
              console.log(rand);
              
         
      }
}
//gameState is END
else if(gameState === END) {
        restart.visible = true;

        //set velocity for each gameobject to 0
        invisibleGround.velocityX = 0;
        player.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        
        //change the girl animation
        player.changeAnimation("stopped", girl_stopped);

        //set lifetime of the game objects so that they are never destroyed 
        obstaclesGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)){
                reset();
        }
}


  drawSprites();
  
  //Adding text for showing the money
  fill("yellow");
  textSize(24);
  text("Money: "+ money, 600,50);
}


function spawnObstacles(){
  if(frameCount % 260 === 0){
    var obstacle = createSprite(850,400);
    obstacle.velocityX = -3;
    obstacle.y = Math.round(random(100,400))
    
    //adding random obstacles
    var rand = Math.round(random(1,12));
    switch(rand) {
      case 1: obstacle.addImage(tv);
              break;
      case 2: obstacle.addImage(shoes1);
              break;
      case 3: obstacle.addImage(dress1);
              obstacle.scale = 8;
              break;
      case 4: obstacle.addImage(shirt1);
              break;
      case 5: obstacle.addImage(jeans2);
              obstacle.scale = 3;
              break;   
      case 6: obstacle.addImage(fridgeImg);
              break;  
      case 7: obstacle.addImage(shirt2);
              break; 
      case 8: obstacle.addImage(jeans1);
              break; 
      case 9: obstacle.addImage(coronaImg);
              break; 
      case 10: obstacle.addImage(dress2);
               obstacle.scale = 0.5;
              break;
      case 11: obstacle.addImage(bitterImg);
               obstacle.scale = 0.05;
              break;
      case 12: obstacle.addImage(sofa);
               obstacle.scale = 7;   
              break;
      default: break;
          
    }
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.3;
    obstacle.lifetime = 850;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
}
}

function reset(){
  gameState = PLAY;
  restart.visible = false;

 obstaclesGroup.destroyEach();

 player.changeAnimation("player", girlImg);

 money = 0;
}

function corona(){
        if(frameCount% 570 === 0){
                var corona = createSprite(900,550)
                corona.addImage(coronaImg);
                corona.velocityX = -3;
                corona.scale = 0.2
                
                coronaGroup.add(corona);

                corona.y = Math.round(random(50,400))
                
        }
}

function lottery()
{
        if(frameCount% 1050 === 0){
                var lottery1 = createSprite(850,550);
                lottery1.addImage(moneyBagImg);
                lottery1.velocityX = -3;
                lottery1.scale = 0.3;

                lottery1.y = Math.round(random(60,490))
                moneyGroup.add(lottery1);

        }
}

function sanitizer(){
      var lifebouy = createSprite(500,40);
      lifebouy.addImage(sanitizerImg);
      lifebouy.visible = true;
      lifebouy.scale = 0.2;
      if(mousePressedOver(lifebouy)){
              money = money-20;
              lifebouy.visible = false;
      }
}

function mask(){
        var mask1 = createSprite(400,40);
        mask1.addImage(maskImg);
        mask1.visible = true;
        mask1.scale = 0.2;
        if(mousePressedOver(mask1)){
                money = money-20;
                mask1.visible = false;
        }
}


function changeBg(){
       if(frameCount%30=== 0){
            
              //bg.velocityX = -2;

                var rand = Math.round(random(1,7));
                 switch(rand) {
                        case 1: bg.changeAnimation("1", bg1);
                        state = "house";
                        break;
                        case 2: bg.changeAnimation("2", bg2);
                        state = "horror";
                        bg.scale = 2.5; 
                        break;
                        case 3: bg.changeAnimation("3", bg3);
                        state = "forest";
                        bg.scale = 2.5; 
                        break;
                        case 4: bg.changeAnimation("4", bg4);
                        state = "citym";
                        break;
                        case 5: bg.changeAnimation("5", bg5);
                        state = "citye"
                        bg.scale = 2.5; 
                        break;
                        case 6: bg.changeAnimation("6", bg6);
                        state = "Market1";
                        bg.scale =  1.5; 
                        break;
                        case 7: bg.changeAnimation("7", bg7);
                        state = "Market2";
                        bg.scale = 2.5; 
                        break;
                  default: break;
     
         }

          

}}

function spawnObstacles1(){
        if(frameCount % 670 === 0){
          var obstacle = createSprite(850,400);
          obstacle.velocityX = -3;
          obstacle.y = Math.round(random(100,400))
          
          //generate random obstacles
          var rand = Math.round(random(13,20));
          switch(rand) {
            case 13: obstacle.addImage(appleImg);
                     obstacle.scale = 0.08;
                     break;
            case 14: obstacle.addImage(basilImg);
                     obstacle.scale = 0.3;
                     break;
            case 15: obstacle.addImage(bananaImg);
                     obstacle.scale = 0.09;
                     break;
            case 16: obstacle.addImage(grapesImg);
                     break;
            case 17: obstacle.addImage(watermelon);
                     break;
            case 18: obstacle.addImage(neemImg);
                     break;
            case 19: obstacle.addImage(orangeImg);
                     obstacle.scale = 0.1;
                     break;
            case 20: obstacle.addImage(rockImg);
                     break;
            default: break;
                
          }
          //assign scale and lifetime to the obstacle
          obstacle.scale = 0.3;
          obstacle.lifetime = 850;
      
          //add each obstacle to the group
          obstaclesGroup1.add(obstacle);
      }
      }
