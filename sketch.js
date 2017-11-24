function setup() {
  var canvas = createCanvas(600,400);
  canvas.parent('sketch-holder');
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
  x = mouseX;                    //get clicked spot
	y = mouseY;
	if(done == false){            //unless the polygon is complete,
		    if(prevy != 0) {        //draw line connecting previous clicked spot and current
		        var e = new Edge(prevx,prevy,x,y); //create edge from those points
		        line_array.push(e);	               //add line to the array
		        if(e.will_close(line_array[0])){   //if this line will close the polygon
		        	done = true;
              var p = new Polygon(line_array);
		        }
            ellipse(e.x2, e.y2, 5, 5);      //draw point at that spot
            line(e.x1,e.y1, e.x2, e.y2);
		    }
        else {
          ellipse(x, y, 5, 5);
        }
	    prevx = x;
	    prevy = y;
	}
  return false;
}
