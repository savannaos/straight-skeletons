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

var line_array = new Array();
var done = false;

function mousePressed(){
<<<<<<< HEAD
    x = mouseX;               //get clicked spot
	y = mouseY;
	if(done == false){
	    ellipse(x, y, 5, 5);      //draw point at that spot
		    if(prevy != 0) {          //draw line connecting previous clicked spot and current
		        line(x,y,prevx,prevy);
		        var e = new edge(x,y,prevx,prevy);
		        line_array.push(e);	  //add line to the array
		        if(e.will_close(line_array[0])){
		        	done = true;
		        }
		    }
	    prevx = x;
	    prevy = y;
	}
  return false;
}
