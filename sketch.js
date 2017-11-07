function setup() {
  createCanvas(600,400);
  background(171,212,242);
}

function draw(){

}

function mousePressed(){
  ellipse(mouseX, mouseY, 5, 5);
  return false;
}
