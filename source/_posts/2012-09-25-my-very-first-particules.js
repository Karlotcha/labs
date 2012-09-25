---
layout: post
title: "my very first particules"
date: 2012-09-25 22:11
comments: true
categories: 
---

<!-- more -->

// ************************************************************************************
// POINT CLASS
// ************************************************************************************
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

Point.prototype.move 	= function (v, l) {
	var elapsed = Date.now() - start
	  , l = l || 3000
	
	this.svg.attr("transform", function(d) { return "translate(" + (elapsed/v)%l + ")"; })
	
	this.x = this.x0 + (elapsed/v)%l
	this.y = this.y0 + (elapsed/v)%l
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

for (var i =0; i<4000; i++) {
	speeds.push(rand(20)+1)
	distances.push(rand(2000)+1000)
	new Point(rand(800)-800, rand(800))
}


d3.timer(function() {
	Point.list.forEach(function(thiz, i){thiz.move(speeds[i], distances[i])})
});
