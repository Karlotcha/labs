---
layout: post
title: "spark"
date: 2012-11-28 18:45
comments: true
categories: 
---

<!-- more -->

// ************************************************************************************
// POINT CLASS
// ************************************************************************************
function Point () {
	this.svg  = main_svg.append("svg:circle")
						.attr('cx', 0)
						.attr('cy', 0)
						.attr('r' , 1)	
						
	this.svg.attr('fill' , 'white')	
	this.start = Date.now()
	
	this.t = (this.start - start)/1000
	
	this.x = Math.cos(this.t)*200 + 400
	this.y = Math.sin(this.t)*200 + 300
	
	this.coeffX  = (rand(this.start*2) - this.start)/this.start
	this.coeffY  = (rand(this.start*2) - this.start)/this.start
	
	this.index = Point.list.length
	Point.list[this.index] = this
}

Point.prototype.move 	= function () {
	var t = (Date.now() - this.start)/1000

	if (t>2) {
		this.svg.remove()
		delete Point.list[0]
	} else {
		this.x = this.x + this.coeffX*rand(t*2+1)*0.9
		this.y = this.y + this.coeffY*rand(t*2+1)*0.9
		
		this.svg.attr('cx', this.x)
		this.svg.attr('cy', this.y)
		
		this.svg.attr('fill' , d3.rgb(
			  255
			, (255 - t*100)%256
			, (125  - t*125)%256
			).toString())
	}
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
  , i 			= 0
  
// ************************************************************************************
// FUNCTIONS HELPERS
// ************************************************************************************
  , rand = function (n) {
		return Math.floor(Math.random()*n)
    }
  
// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************

setInterval(function() {
	new Point()
	new Point()
	new Point()
	Point.list.forEach(function(thiz, i){thiz.move()})
}, 1);
