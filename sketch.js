function setup() {
  canvas = createCanvas(600,400);
  canvas.parent('sketch-holder');
  background(171,212,242);
  x = 0;
  y = 0;
  prevx = 0;
  prevy = 0;
  done = false;
  line_array = new Array();
  button = createButton('clear');
  button.position(550,80);
  button.mouseReleased(clearLines);
}


function clearLines(){
  line_array = [];
  canvas.background(171,212,242);
  prevx = 0;
  prevy = 0;
  x = 0;
  y = 0;
  done = false;
}

function mousePressed(){
  x = mouseX;                                   		//get clicked spot
  y = mouseY;
  if (x < 600 && y >= 0 && y < 400)
	if(done == false){                          	    //polygon is not yet finished
		if(prevy != 0) {                        		//previous clicked spot exists
		     var e = new Edge(prevx,prevy,x,y); 		//create edge from those points
		     line_array.push(e);	                	//add that line to the array
					 if(e.will_close(line_array[0])){    //if this line will close the polygon
						  ellipse(e.x2, e.y2, 5, 5);          	//draw point at that spot
					      line(e.x1,e.y1, e.x2, e.y2);
						  done = true;
						  var p = new Polygon(line_array);
						  run_simulation(p);
				     	  }
					 else if(is_simple(line_array)){
						  ellipse(e.x2, e.y2, 5, 5);          	//draw point at that spot
					      line(e.x1,e.y1, e.x2, e.y2); 
					      prevx = x;
					      prevy = y;
					 	  }
					 else{
						 line_array.pop();
						 console.log(line_array);
					 }
		}
		else{ 
			ellipse(x, y, 5, 5);
			prevx = x;
		    prevy = y;
		}
	}		
}

function is_simple(line_array){
	var simple = true;							  //assume the polygon is true for 1 edge and 2 edges
	var line;
	var last;
	var i = 0;
	 // compare every line so far to see if it intersects with the last line that was drawn
	if(line_array.length > 2){ 					  // only test if there are at least 3 lines in the array 
		last = line_array[line_array.length - 1]; // last line that was added to the array
		for(i; i < line_array.length-2; i++){	  // compare last line to every line before it 
			line = line_array[i];
			test1 = ccw(line.x1, line.y1, line.x2, line.y2, last.x1, last.y1);
			test2 = ccw(line.x1, line.y1, last.x1, last.y1, last.x2, last.y2);
		    test3 = ccw(last.x1, last.y1, last.x2, last.y2, line.x1, line.y1);
			test4 = ccw(last.x1, last.y1, last.x2, last.y2, last.x2, last.y2);
			if(test1 != test2 && test3 != test4) 
					simple = false;
					return simple;
					break;
				
      }
    }
		console.log(simple);
		return simple;
		
}


//ccw test takes three points a, b, c as input
function ccw(ax, ay, bx, by, cx, cy){
	console.log(ax, ay, bx, by, cx, cy);
	test = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
	if(test > 0)
		return 1; //counter clock-wise
	else if(test == 0)
		return 0; //co-linear
	else return -1; //clockwise
}

function run_simulation(polygon){
  //calls straight_skeleton and draws out the lines returned
  edges = polygon.straight_skeleton();
  edge_holder = new Polygon(edges);
  edge_holder.draw_polygon();
}
