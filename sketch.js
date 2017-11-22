function setup() {
  createCanvas(600,400);
  background(171,212,242);
  x = 0;
  y = 0;
  prevx = 0;
  prevy = 0;

}

function draw(){

}

function mousePressed(){
  x = mouseX;               //get clicked spot
	y = mouseY;
  ellipse(x, y, 5, 5);      //draw point at that spot
  if(prevy != 0) {          //unless it's the first click,
    line(x,y,prevx,prevy);  //draw line connecting previous clicked spot and current
  }
  prevx = x;
  prevy = y;
  return false;
}
