---
layout: post
title: "let's add other directions!"
date: 2012-09-27 00:01
comments: true
categories: 
---

<!-- more -->

function Point (cx, cy) {
	this.svg  = main_svg.append("svg:circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r' , 1)	
						
	if (rand(2)==0)	this.svg.attr('fill' , 'grey')	
	else			this.svg.attr('fill' , 'blue')	
	
	this.x0 = cx
	this.y0 = cy
	
	this.x = cx
	this.y = cy
						
	Point.list.push(this)
}

Point.prototype.move 	= function (v, l, direction) {
	var elapsed = Date.now() - start
	  , l = l || 800
	
	// this.svg.attr("transform", function(d) { return "translate(" + (elapsed/v)%l + ")"; })
	switch(direction) {
		case 0:
			this.x += rand(v)
			this.y += rand(v)
		break;
		case 1:
			this.x -= rand(v)
			this.y += rand(v)
		break;
		case 2:
			this.x += rand(v)
			this.y -= rand(v)
		break;
		case 3:
			this.x -= rand(v)
			this.y -= rand(v)
		break;
		case 4:
			this.x += rand(v)
		break;
		case 5:
			this.x -= rand(v)
		break;
		case 6:
			this.y += rand(v)
		break;
		case 7:
			this.y -= rand(v)
		break;

	}
	
	this.svg.attr('cx', this.x)
	this.svg.attr('cy', this.y)
}

Point.prototype.d 		= function (point) {
	return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
}
// ************************************************************************************
// POINT CLASS - STATIC METHODS & ATTRIBUTES
// ************************************************************************************

Point.list = []

// ************************************************************************************
// GLOBAL VARIABLES
// ************************************************************************************
var main_svg 	= d3.select("body").append("svg:svg")
  , start 		= Date.now()

// ************************************************************************************
// FUNCTIONS HELPERS
// ************************************************************************************
  , rand = function (n) {
		return Math.floor(Math.random()*n)
    }
  
// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************
var speeds  	= []
  , distances	= []
  , directions 	= []

for (var i =0; i<4000; i++) {
	speeds.push(rand(200)+1)
	distances.push(rand(2000)+1000)
	directions.push(rand(8))
	new Point(rand(20)+500, rand(20)+500)
}


d3.timer(function() {
	Point.list.forEach(function(thiz, i){thiz.move(speeds[i], distances[i], directions[i])})
});
