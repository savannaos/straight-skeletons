class Polygon{
	constructor(e){
		this.edges = e; //list of edges
}
	clockwise() {	// determines if edges are stored in clockwise order
		var a = 0;
		for (i = 0; i < this.edges.length; i++) {
			var e = this.edges[i];
			a += e.x1*e.y2 - e.x2*e.y1;
			//this.area = Math.abs(0.5*a); included this as a comment in case area is ever needed
		}
		this.cw = a < 0;	// this.cw is true if the edges are stored in clockwise order
	}

	angle(e1, e2) {	// determines interior angle at shared vertex of two edges
		var x1 = e1.x1;
		var y1 = e1.y1;
		var x2 = e1.x2;
		var y2 = e1.y2;
		var x3 = e2.x2;
		var y3 = e2.y2;
		var x12 = x2 - x1;
		var y12 = y2 - y1;
		var x23 = x3 - x2;
		var y23 = y3 - y2;
		var d12 = Math.pow(x12, 2) + Math.pow(y12, 2);
		var d23 = Math.pow(x23, 2) + Math.pow(y23, 2);
		var d13 = Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2);
		var a = Math.acos((d12 + d23 - d13)/(2 * Math.sqrt(d12) * Math.sqrt(d23)));	// angle between 0 and pi radians
		var c = x12*y23 - x23*y12;	// cross product of two edges: e1 x e2
		// cross product will be negative if interior angle is greater than pi when
		// the edges are ordered clockwise; positive when ordered counterclockwise
		if ((c > 0 && this.cw) || (c < 0 && !this.cw))
			a = 2*Math.PI - a;	// ensuring angle is that of the interior angle
		return a;
	}

	direction(e1,e2){
		//input: two adjacent edges of a polygon
		//output: [x,y], the shrinking direction for the vertex connecting the two edges
		//Idea: compute angle between the two lines and pick a vector that
		//splits the angle evenly (bisector).
		var a = this.angle(e1, e2)/2;
		var x1 = e1.x1;
		var y1 = e1.y1;
		if (!this.cw) {	// determine new angle from second edge if edges are ordered counterclockwise
			x1 = e2.x2;
			y1 = e2.y2;
		}
		var x2 = e1.x2;
		var y2 = e1.y2;
		var dx = x1 - x2;
		var dy = y1 - y2;
		var sy = Math.sign(dy);
		if (dx == 0)
			a = a + sy*(Math.PI/2);
		else if (dx > 0)
			a = a + sy*Math.atan(Math.abs(dy)/Math.abs(dx));
		else
			a = a + Math.PI - sy*Math.atan(Math.abs(dy)/Math.abs(dx));
		return [Math.cos(a), Math.sin(a)];
	}

  shrink(lambda){
		//input: a lambda value to shrink in by
		//output: new set of edges after performing the shrink.
		//Idea: for all vertices, [x,y] = direction()
		//new vertex =  old + (lambda * [x,y]).
		var new_edges = new Array();
		var i,e_curr,e_prev, x_curr, x_prev, y_curr, y_prev,x_start,y_start;
		var last = this.edges.length-1;
		for(i = 0; i < this.edges.length; i++){
			e_curr = this.edges[i];
			if(i==0) {e_prev = this.edges[last];}
			else     {e_prev = this.edges[i-1];}
			var d = this.direction(e_prev,e_curr);
			x_curr = e_curr.x1 - (d[0] * lambda);
			y_curr = e_curr.y1 - (d[1] * lambda);
			if(i==0){
				x_start = x_curr;
				y_start = y_curr;
			}
			else {
				var e = new Edge(x_prev, y_prev, x_curr,y_curr);
				new_edges.push(e);
			}
			if(i==last){ 														//connect back to starting vertex
				var e = new Edge(x_curr,y_curr, x_start, y_start);
				new_edges.push(e);
			}
			x_prev = x_curr;
			y_prev = y_curr;
		}
	  var p = new Polygon(new_edges);
		return p; //will need to be an array for when we need to return multiple polygons
	}

	straight_skeleton(){
		//Idea: until stopping condition, iteratively call shrink on a polygon.
		//Index each edge list of a polygon the same so at the end we can draw
		//where each vertex travelled to.
		var lambda = 20;
		var poly = this;
		for(var i = 0; i < 5; i ++){
		  poly = poly.shrink(lambda);
		  poly.draw_polygon();
		}
	}

	draw_polygon(){
		//For visual testing
		var i, edge;
		//stroke(204, 102, 0);
		for(i = 0; i < this.edges.length; i++){
			edge = this.edges[i];
			line(edge.x1, edge.y1, edge.x2, edge.y2);
		}
	}

}
