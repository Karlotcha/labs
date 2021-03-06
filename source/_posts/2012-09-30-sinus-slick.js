---
layout: post
title: "sinus slick"
date: 2012-09-30 00:01
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
						
	this.svg.attr('fill' , 'white')	
	
	this.x0 = cx
	this.y0 = cy
	
	this.x = cx
	this.y = cy
	
	this.coeff = 70

	this.start = Date.now()
						
	Point.list.push(this)
}

Point.prototype.move 	= function () {
	var t = (Date.now() - this.start)/200

	// this.svg.attr("transform", function(d) { return "translate(" + (elapsed/v)%l + ")"; })
	
	this.x = this.x0 + t*this.coeff
	this.y = this.y0 + Math.sin(t)*this.coeff
	
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
d3.timer(function() {

	new Point(0, 200+rand(400))
	new Point(0, 200+rand(400))
	new Point(0, 200+rand(400))

	Point.list.forEach(function(thiz, i){thiz.move()})
});

