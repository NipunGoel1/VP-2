var dog,happyDog,dogImg;
var foodS,foodStock,database,lastFed;
var milk;
var input,name,setName,enter;
var button,button2 ;
function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1600, 800);
  dog = createSprite(800,350,50,50);
  dog.addImage(dogImg)
  dog.scale=0.2;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  input = createInput("Name");
  enter = createButton("Enter Name");

button = createButton("Add Milk");
button.position(570,20,);

enter.position(displayHeight/2+200,640);
input.position(displayHeight/2+200,600);
  
milk = new Food(30,30,30,30);

}


function draw() {  
background(46,239,87);
milk.display(); 
setName = database.ref("Name");
setName.on("value",function(data){
  setName = data.val();
})

fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  enter.mousePressed(function(){
    name = input.value();
    
  })
  updateName(name);
   button2 = createButton("Feed "+ name);
   button2.position(660,20);
fill("red")
textSize(24)
if(lastFed>=12){
   text("Last Feed: "+lastFed%12+" PM",250,30)
}else if(lastFed===0){
  text("Last Feed : 12AM ",250,30)
}else{
  text("Last Feed : "+ lastFed + " AM",250,30)
}


button2.mousePressed(function(){
writeStock(foodS),
dog.addImage(happyDog)})


 button.mousePressed(function(){
   addStock(foodS)
   
 })


  drawSprites();
  textSize(32);
  fill(255);
  stroke(2)

text("foodRemaining " + foodS,500,100)
}
function readStock(data){
foodS = data.val();
milk.updateFoodStock(foodS);
}
function addStock(x){
if(x>=20){
  x=20
}else{
  x=x+1; 
}
database.ref("/").update({
  Food : x 
})
milk.updateFoodStock(x);

}
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  milk.updateFoodStock(x);

  
database.ref("/").update({
  Food : x,
  FeedTime:hour()
})

}
function updateName(x){
setName = database.ref("/").update({
  Name:x
})
}

