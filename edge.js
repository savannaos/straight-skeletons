class Edge{

	constructor(x1,y1,x2,y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	will_close(beginning_edge){
		var e = this;
		var begin = beginning_edge;
		// add stuff here comparing the two
		//if the user has clicked in the general vicinity of the starting point, then
		//this edge's second coordinate (this.x2,this.y2) should equal the starting point.
		//and we should return true to signal that the polygon is finished  
		return false;
	}


}
