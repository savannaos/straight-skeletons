class polygon{
	var edges;
	constructor(e){
		this.edges = e;
		beginShape();
		for(var i = 0; i<this.edges.length;i++){
			vertex(this.edges[i].x1,this.edges[i].y1);
			if(i<this.edges.length-1){								//don't double count first point
				vertex(this.edges[i].x2, this.edges[i].y2);
			}
		endShape(CLOSE);
	}

}
