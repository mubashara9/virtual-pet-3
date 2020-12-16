//Create variables here
var dog, database;
var foodS, foodStock, dogimg, happydogimg;

var feedB, addFoodB;

var fedTime, foodObj, readState, currentTime;
var lastFed, bedroom, garden, washroom, gameState,sadD

function preload(){
  //load images here
  dogimg = loadImage("Dog.png");
  happydogimg = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed.png")
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash.png")
  sadD = loadImage("images/Lazy.png")
}

function setup() {
  
  database= firebase.database();
createCanvas(400, 500);
  foodObj = new Food();
   foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  fedTime= database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  dog = createSprite(250,350,50,50);
  dog.addImage(dogimg);

  dog.scale = 0.3
  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  })

 // happydog = createSprite(300,350,50,50);
  
  
 

  

  

  feedB = createButton("Feed");
  feedB.position(700,95);
 feedB.mousePressed(feedDog);
  addFoodB = createButton("Add Food");
  addFoodB.position(800,95); 
 addFoodB.mousePressed(addFoodS)  //don't know addFoodS and feedDog



}


function draw() {  

  currentTime=hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime ===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  

textSize(20);
fill("yellow");
noStroke();
//text("Note: Press UP arrow to feed the dog", 100,100)

text("Foodcount: "+foodS,100,50)
  
  //add styles here




  

  

  if(gameState!="hungry"){
    feedB.hide();
    addFoodB.hide();
    dog.remove();
  }
  else{
    feedB.show();
    addFoodB.show();
    dog.addImage(dogimg)
  }

 
  drawSprites();
}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}



function feedDog(){
  dog.addImage(happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state,
  })
}