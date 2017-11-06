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






