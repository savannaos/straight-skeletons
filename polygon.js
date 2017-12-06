class Polygon{
	constructor(e){
		this.edges = e; //list of edges
		this.lambda = 20;
		this.cw = this.clockwise();	// true if the edges are stored in clockwise order
		var last = this.edges.length -1;
		for(let i=0; i<this.edges.length; i++){ //sets up halfedge
			if(i==0)    this.edges[i].set_prev(this.edges[last]);
			else        this.edges[i].set_prev(this.edges[i-1]);
			if(i==last) this.edges[i].set_next(this.edges[0]);
			else 		    this.edges[i].set_next(this.edges[i+1]);
		}
		this.bisectors = this.compute_bisectors();
		this.intersection = false;
}
  compute_bisectors(){
		//compute and return the list of bisectors for the vertices in the polygon.
		var bisectors = new Array();
		for(var i = 0; i<this.edges.length; i++){
			var e = this.edges[i];
			var d = this.direction(e.prev,e);
			d[0] = d[0] * this.lambda;
			d[1] = d[1] * this.lambda;
			bisectors.push(d);
		}
		return bisectors;
	}
	clockwise() {	// determines if edges are stored in clockwise order
		var a = 0;
		for (var i = 0; i < this.edges.length; i++) {
			var e = this.edges[i];
			a = a + (e.x2 - e.x1)*(e.y2 + e.y1);
			//this.area = Math.abs(0.5*a); included this as a comment in case area is ever needed
		}
		return a < 0;
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
		var x = Math.cos(a);
		var y = Math.sin(a);
		var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		return [x/d * -1, y/d* -1];
	}

  shrink(){
		//input: a lambda value to shrink in by
		//output: new set of edges after performing the shrink.
		//Idea: for all vertices, [x,y] = direction()
		//new vertex =  old + (lambda * [x,y]).
		var new_edges = new Array();
		var i,e_curr,e_prev, x_curr, y_curr, x_next, y_next,cond = false, update_next_point = false;
		for(i = 0; i < this.edges.length; i++){
			e_curr = this.edges[i];
			if(update_next_point) { update_next_point = false;}
			else {
				x_curr = e_curr.x1 + this.bisectors[i][0]; 				//get x moved along bisector
				y_curr = e_curr.y1 + this.bisectors[i][1];				//get y moved along bisector
			}
			if(i==this.edges.length-1){
				x_next = new_edges[0].x1;
				y_next = new_edges[0].y1;
			}
			else {
				x_next = e_curr.x2 + this.bisectors[i+1][0];
				y_next = e_curr.y2 + this.bisectors[i+1][1];
			}
			//check bisector intersections --------------------
			var intersection = intersect(e_curr.x1,e_curr.y1, x_curr, y_curr, e_curr.x2,
			e_curr.y2, x_next, y_next);
			if(intersection){ //bisectors intersect so set endpoints to that point of intersection
				cond = true; update_next_point =true;
				x_next = x_curr = intersection[0];
				y_next = y_curr = intersection[1];
				if(new_edges.length > 0){ //remedy the previous edge
					new_edges[new_edges.length-1].set_endpoint2(x_curr,y_curr);
				}
			}
			var e = new Edge(x_curr,y_curr,x_next,y_next);
			new_edges.push(e);
		}
		var p = new Polygon(new_edges);
		p.intersection = cond;
		return p;
	}

  area_approx_zero(){
		//check if this polygon is about zero area
	}

  split(){
		//Output: an array of polygons if a split occured
	}

	straight_skeleton(){
		//Output: an array of edges that make up the polygon's straight skeleton
		//Idea: until stopping condition, iteratively call shrink on a polygon.
		//At each iteration, add an edge to the skeleton connecting the vertices
		//of the previous polygon and the new shrunken one.
		var poly = this;
		var new_poly;
		var skeleton = new Array();
		var i = 0;
		while(i < 10){
		  new_poly = poly.shrink();
			//split = poly.split();
			console.log(i);
		  //new_poly.draw_polygon();
			for(var j = 0; j< poly.edges.length; j++){ //add edges to straight skeleton
				var e = new Edge(poly.edges[j].x1, poly.edges[j].y1, new_poly.edges[j].x1, new_poly.edges[j].y1);
				skeleton.push(e);
			}
			poly = new_poly;
			i++;
			if(poly.intersection) poly = poly.remove_points(); //reduces size of polygon
			if(poly.edges.length <= 1) return skeleton;
		}
		return skeleton;
	}

	remove_points(){
		var new_edges = new Array();
		for(var i = 0; i < this.edges.length; i++){
			if (!this.edges[i].is_point()){
				new_edges.push(this.edges[i]);
			}
		}
		var p = new Polygon(new_edges);
		return p;
	}

  remove_collapsed(){
		//Output: polygon that removes the edges that collapsed into points
		//var new_edges = new Array();
		var edges = this.edges;
		for(var i = 0; i < edges.length; i++){
		//DOES THIS PIECE EVERYTHING TOGETHER? FIXXX
		var e = new Edge(0,0,0,0);
	    var new_edges = new Array();
		//var e = new Edge(0,0,0,0);
		var i = 0;
		var edges = this.edges; //list of edges in the polygon
		console.log(edges[i+1]);
		for(i; i < edges.length-2; i++){
			var intersect = e.edge_intersect(new Edge(edges[i].x1, edges[i].y2, edges[i].x2, edges[i].y2),
											 new Edge(edges[i+1].x1, edges[i+1].y2, edges[i+1].x2, edges[i+1].y2)); //returns the intersection of the two edges or false
			if(intersect == false)
				new_edges.push(new Edge(intersect[0],intersect[1],intersect[0],intersect[1])); //edge is actually a point, add to new polygon
			else
				new_edges.push(edges[i]);
		}
		return new Polygon(new_edges);
	}
}

	draw_polygon(){
		//For visual testing
		var i, edge;
		for(i = 0; i < this.edges.length; i++){
			edge = this.edges[i];
			line(edge.x1, edge.y1, edge.x2, edge.y2);
		}
	}

}
