# straight-skeletons
An interactive visualization of straight skeletons and their construction.

A straight skeleton is a representation of a polygon by a skeleton. The edges of the polygon are moved inwards parallel to themselves at constat speed. This process is called shrinking. The straight skeleton is the set of lines traced out by moving vertices in this process.

Given a polygon, we implement a shrinking algorithm that constructs the straight skeleton. An example starts with a polygon (left) and constructs the straight skeleton (middle). This can be applied to construciton of a roof with constant slope over a polygonal building (right):

![alt text](https://www.sthu.org/research/straightskeleton/images/StraightSkeletonDefinition.png)

## Shrinking Algorithm definitions 

Edge event: An edge shrinks to zero, making its neighboring edges adjacent

Split event: A reflex vertex runs to this edge and splits it, thus splitting the entire polygon. 
New adjacencies occur between the split edge and each of the two edges incident to the reflex vertex.

## Basic Shrinking Algorithm outline

1. Initialize polygon as list of lines (|V|,|E|)
2. Define lambda, where lambda is the constant distance that each edge will shrink in every iteration
3. direction = list of tuples of length |V|
4. for each line: extract points and determine which direction to shrink
5. while(not done): 
	if(split event): break up into two polygons
		newpts = shrink(pts, direction) for each existing polygon
6. create new lines from pts to newpts for each existing polygon
7. Repeat 3-6 until all edges have edge event

## Visual Plan

The program will be a webpage where users will be able to draw a polygon on the screen with their mouse. This will be done by clicking the screen at the location where an edge of the polygon should start, moving the cursor to the location where it should end, and clicking again, which will generate the edge visually on the screen between those two points.

![alt text](https://imgur.com/eqYSApv)

Once this is done, the point at the end of the first edge will be set as the start of the second edge, and the next place the user clicks will generate the second edge between those two points on the screen.

![alt text](https://imgur.com/RUTA67J)

This process is repeated until the user generates a line which creates a full polygon.

![alt text](https://imgur.com/yprEq3M)

![alt text](https://imgur.com/yQGL6UM)

Once the polygon is created, the program will then display the process of the construction of the straight skeleton. This will show the lines being created as the edges the edges of the polygon move inward.

![alt text](https://imgur.com/hGqzdEX)

![alt text](https://imgur.com/WneLYSq)



