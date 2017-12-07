function setup() {
  var all_polygons;
  var skeleton;
  var display;
  canvas = createCanvas(600,400);
  canvas.parent('sketch-holder');
  background(171,212,242);
  x = 0;
  y = 0;
  prevx = 0;
  prevy = 0;
  done = false;
  line_array = new Array();
  clear_but = createButton('clear');
  clear_but.position(550,80);
  clear_but.mouseReleased(clearLines);

  rectangle_but = createButton('Rectangle');
  rectangle_but.position(10,520);
  rectangle_but.mouseReleased(draw_rectangle);

  toggle_display_but = createButton('Toggle Display');
  toggle_display_but.position(400, 80);
  toggle_display_but.mouseReleased(toggle_disp);

  hex_but = createButton('Pentagon');
  hex_but.position(90,520);
  hex_but.mouseReleased(draw_pent);
}
function draw_pent(){
	clearLines();
  e = [new Edge(94, 168.125, 330, 41.125),
  new Edge(330, 41.125, 488, 131.125),
  new Edge(488, 131.125, 488, 183.125),
  new Edge(488, 183.125, 333, 274.125),
  new Edge(333, 274.125, 94, 168.125)];
	var p = new Polygon(e);
  p.draw_polygon();
	run_simulation(p);
	done = true;
}
// for demo
function draw_rectangle(){
	clearLines();
	e = [new Edge(100,100,100,300),new Edge(100,300,400,300)];
	done = true;
	e = [new Edge(100,100,100,300),new Edge(100,300,400,300),
	     new Edge(400,300,400,100), new Edge(400,100,100,100)];
    line(100,100,100,300);
    line(100,300,400,300);
    line(400,300,400,100);
    line(400,100,100,100);

    console.log(e);

	var p = new Polygon(e);
	run_simulation(p);
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
						 line_array.pop();				// if the poly that the user wants to draw isnt simple, then take that out the array
						 								// don't update the prev x and prev y
					 }
		}
		else{ 											// when there is only one point
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
					//return simple;
					break;

      }
    }
		//console.log(simple);
		//return simple;
    return true;
}


//ccw test takes three points a, b, c as input
function ccw(ax, ay, bx, by, cx, cy){
	//console.log(ax, ay, bx, by, cx, cy);
	test = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
	if(test > 0)
		return 1; //counter clock-wise
	else if(test == 0)
		return 0; //co-linear
	else return -1; //clockwise
}

function run_simulation(polygon){
  //calls straight_skeleton and draws out the lines returned
  ret = polygon.straight_skeleton();
  skeleton = new Polygon(ret.skeleton);
  skeleton.draw_polygon();
  all_polygons = ret.polygons;
  for(var i = 0; i < all_polygons.length; i++){
    all_polygons[i].draw_polygon();
  }
  display = 1;
}

function intersect(a1,a2,b1,b2){
  //input is start and end points for line segments a and b.
  return intersect(a1[0],a1[1],b1[0],b1[1],b2[0],b2[1]);
}
function intersect(ax1,ay1,ax2,ay2,bx1,by1,bx2,by2){
  //computes the intersection of two line segments
  var intersection;
  if((ccw(ax1, ay1, ax2, ay2, bx1, by1) == ccw(ax1, ay1, ax2, ay2, bx2, by2)) &&
     (ccw(bx1, by1, bx2, by2, ax1, ay1) == ccw(bx1,by1, bx2, by2, ax2, ay2))){
       return false;
     }
  // compute the intersection
  var m1 = (ay1 - ay2) / (ax1 - ax2);
  var m2 = (by1 - by2) / (bx1 - bx2);
  var b1 = ay1 - m1*ax1;
  var b2 = by1 - m2*bx1;
  var x = (b2 - b1) / (m1 - m2);
  var y = m1*x + b1;
  return [x,y];
}

function approx(a,b){
  eps = 6;
  if(abs(a-b)<=eps) return true;
  else return false;
}

function toggle_disp(){
  if(done){
    if(display == 3){
      skeleton.draw_polygon();
      display = 1;
    }
    else {
      clearLines(); done = true;
      if(display == 1){
        skeleton.draw_polygon();
        display = 2;
      }
      else {
        for(var i = 0; i < all_polygons.length; i++){
          all_polygons[i].draw_polygon();
        }
        display = 3;
      }
    }
  }
}
