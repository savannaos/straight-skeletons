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
		if((abs(this.x1-this.x2) <= eps) && abs(this.y1-this.y2 <=eps)){
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


}
