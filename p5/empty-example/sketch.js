var x = 0;
function setup() {
  createCanvas(600,400);
  //line(15,25,70,90);
  background(150,70,140);
}

function draw() {
  fill(x);
  rect(25,25,50,50);
  //ellipse(x,height/2,20,20);
  //x = x +1;
  // mouseX pixels right, mouseY pixels down. width and height = 80 pixels
}

function mousePressed(){
  ellipse(mouseX, mouseY, 5, 5);
   // prevent default
  return false;
}

function mouseMoved(){
  ellipse(mouseX,mouseY, 5,5);
  return false;
}
