function setup() {
  var canvas = createCanvas(600,400);
  canvas.parent('sketch-holder');
  background(171,212,242);
  x = 0;
  y = 0;
  prevx = 0;
  prevy = 0;

}


function clear(){

}

var line_array = new Array();
var done = false;
var simple;

function mousePressed(){
  x = mouseX;                                   		//get clicked spot
  y = mouseY;
	if(done == false){                          	    //polygon is not yet finished
		if(prevy != 0) {                        		//previous clicked spot exists
		     var e = new Edge(prevx,prevy,x,y); 		//create edge from those points
		     line_array.push(e);	                	//add that line to the array
				 if(is_simple(line_array)){
					 if(e.will_close(line_array[0])){    //if this line will close the polygon
						  done = true;
						  var p = new Polygon(line_array);
				     }
					 ellipse(e.x2, e.y2, 5, 5);          	//draw point at that spot
				     line(e.x1,e.y1, e.x2, e.y2);        	//connect points
				 }
		}
		
	    else{ ellipse(x, y, 5, 5);
		}
	prevx = x;
	prevy = y;
	}
	return false;
}

function is_simple(line_array){
	var simple = true;
	var line;
	var last = line_array[line_array.length - 1]; // the last line that was drawn
	if(line_array.length >= 1){
		for(line in line_array){
			//test for intersection between the all the lines
			test1 = ccw(line.x1, line.y1, line.x2, line.y2, last.x1, last.y1);
			test2 = ccw(line.x1, line.y1, last.x1, last.y1, last.x2, last.y2);
		    test3 = ccw(last.x1, last.y1, last.x2, last.y2, line.x1, line.y1);
			test4 = ccw(last.x1, last.y1, last.x2, last.y2, last.x2, last.y2);	
			if(test1 != test2){
				if(test3 != test4){
					//the lines intersect
					simple = false;
					break
				}
			}
		}
	}
		return simple;
}
	

// ccw test takes three points a, b, c as input
function ccw(ax, ay, bx, by, cx, cy){
	test = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
	if(test > 0)
		return 1; //counter clock-wise
	else if(test == 0)
		return 0; //co-linear
	else return -1; //clockwise
}




