class Edge{

	constructor(x1,y1,x2,y2){
		this.x1 = x1;	//endpoint 1
		this.y1 = y1;
		this.x2 = x2; //endpoint 2
		this.y2 = y2;
		this.prev;
		this.next;
		this.point = false; //is the edge just a point?
	}
	set_prev(e){
		this.prev = e;
	}
	set_next(e){
		this.next = e;
	}
	is_point(){
		return this.point;
	}
	set_point(cond){
		this.point = cond;
	}
	set_coords(x1,y1,x2,y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	is_approx_point(){ //is the edge closely a point? if so, make it one
		var eps = 5;
		if((abs(this.x1-this.x2) <= eps) && (abs(this.y1-this.y2) <=eps)){
			this.set_point(true);
			x = (this.x1 + this.x2)/2;
			y = (this.y1 + this.y2)/2;
			this.set_coords(x,y,x,y);
			return true;
		}
		return false;
	}

	will_close(beginning_edge){
		var eps = 10;
		//if the user has clicked in the general vicinity of the starting point, then
		//this edge's second coordinate (this.x2,this.y2) should equal the starting point.
		//and we should return true to signal that the polygon is finished
	  if((Math.abs(beginning_edge.x1 - this.x2) < eps) &&
				Math.abs(beginning_edge.y1 - this.y2) < eps){
				this.x2 = beginning_edge.x1;
				this.y2 = beginning_edge.y1;
				return true;
		}
		return false;
	}
	
	//returns the intersection between two edges, else returns false. 
	edge_intersect(e1, e2){ 
		var line;
		var last;
		var intersection;
		line = e1;
		last = e2;
		var test1 = ccw(line.x1, line.y1, line.x2, line.y2, last.x1, last.y1);
		var test2 = ccw(line.x1, line.y1, last.x1, last.y1, last.x2, last.y2);
		var test3 = ccw(last.x1, last.y1, last.x2, last.y2, line.x1, line.y1);
		var test4 = ccw(last.x1, last.y1, last.x2, last.y2, last.x2, last.y2);
			if(test1 != test2 && test3 != test4){
				if(e1.x2 == e2.x1 && e1.y2 == e2.x2) //if the edges are touching but not intersecting 
					return false;
				else{
					// compute the intersection
					var m1 = (e1.y1 - e1.y2) / (e1.x1 - e1.x2);
					var m2 = (e2.y1 - e2.y2) / (e2.x1 - e2.x2);
					var b1 = e1.y1 - m1*e1.x1; 
					var b2 = e2.y1 - m2*e2.x1;
					var x = (b2 - b1) / (m1 - m2);
					var y = m1*x + b1;
					return [x,y];
				}
			}
			else 
				return false;
		
	}
	ccw(ax, ay, bx, by, cx, cy){
		//console.log(ax, ay, bx, by, cx, cy);
		test = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
		if(test > 0)
			return 1; //counter clock-wise
		else if(test == 0)
			return 0; //co-linear
		else return -1; //clockwise
	}
}
