---
layout: post
title: "sparking mouse"
date: 2012-12-04 23:49
comments: true
categories: 
---

<!-- more -->

// ************************************************************************************
// POINT CLASS
// ************************************************************************************
function Point (X, Y, e) {
	this.x = X
	this.x0 = X
	this.y = Y
	this.y0 = Y
	this.e = e

	this.svg  = main_svg.append("svg:circle")
						.attr('cx', this.x)
						.attr('cy', this.y)
						.attr('r' , 1)	
						
	this.svg.attr('fill' , 'white')	
	this.start = Date.now()
	
	this.t = (this.start - start)/1000
	
	this.coeffX  = (rand(this.start*2) - this.start)/this.start
	this.coeffY  = (rand(this.start*2) - this.start)/this.start
	
	this.index = Point.list.length
	Point.list[this.index] = this
}

Point.prototype.move 	= function () {
	var t = (Date.now() - this.start)/1000

	if (t>2 || (this.e != 1 && t>1)) {
		this.svg.remove()
		delete Point.list[0]
	} else {
	
		
		if (this.e == 1) {
			this.x += this.coeffX*rand(t*2+1)*0.9
			this.y += this.coeffY*rand(t*2+1)*0.9
		} else {
			this.x = this.x0 + this.coeffX*rand(t*7)*20
			this.y = this.y0 + this.coeffY*rand(t*7)*20
		}
		
		this.svg.attr('cx', this.x)
		this.svg.attr('cy', this.y)
		
		if (this.e == 1) {
			this.svg.attr('fill' , d3.rgb(
				  155 - t*90
				, 25 - t*125
				, 255
				).toString())
		} else {
			this.svg.attr('fill' , d3.rgb(
			  255
			, (255 - t*120)%256
			, (125  - t*155)%256
			).toString())	
		}
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

$('body').live('mousemove', function(e){
	X = e.pageX
	Y = e.pageY
	
	new Point(X, Y, 1)
	return false
})

$('body').live('mousedown', function(e){
	X = e.pageX
	Y = e.pageY
	
	for (var i = 0; i<30; i++) new Point(X, Y, 2)
	return false
})

setInterval(function() {
	Point.list.forEach(function(thiz, i){thiz.move()})
}, 1);
