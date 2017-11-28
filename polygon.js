class Polygon{
	constructor(e){
		this.edges = e;
}
	direction(e1,e2){
		//input: two adjacent edges of a polygon
		//output: [x,y], the shrinking direction for the vertex connecting the two edges
		//Idea: compute angle between the two lines and pick a vector that
		//splits the the angle evenly (bisector).
	}
  shrink(lambda){
		//input: a lambda value to shrink in by
		//output: new set of edges after performing the shrink.
		//Idea: for all vertices, [x,y] = direction()
		//new vertex =  old * lambda * [x,y].
	}
	straight_skeleton(){
		//Idea: until stopping condition, iteratively call shrink on a polygon.
		//Index each edge list of a polygon the same so at the end we can draw
		//where each vertex travelled to.
		var lambda = 10; 
	}

}
