# straight-skeletons
An interactive visualization of straight skeletons and their construction.

A straight skeleton is a representation of a polygon by a skeleton. The edges of the polygon are moved inwards parallel to themselves at constat speed. This process is called shrinking. The straight skeleton is the set of lines traced out by moving vertices in this process.

Given a polygon, we implement a shrinking algorithm that constructs the straight skeleton. An example starts with a polygon (left) and constructs the straight skeleton (middle). This can be applied to construciton of a roof with constant slope over a polygonal building (right):

![alt text](https://www.sthu.org/research/straightskeleton/images/StraightSkeletonDefinition.png)

## Shrinking Algorithm definitions 

###Reflex vertex: In a polygon, if the angle formed by two edges at a vertex with the polygon inside the angle is greater than
180 degrees, it is called "reflex" (or concave).
###Edge event: An edge shrinks to zero, making its neighboring edges adjacent
###Split event: A reflex vertex runs to this edge and splits it, thus splitting the entire polygon. 
New adjacencies occur between the split edge and each of the two edges incident to the reflex vertex.