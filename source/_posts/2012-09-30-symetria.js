---
layout: post
title: "symetria"
date: 2012-09-30 03:22
comments: true
categories: 
---

<!-- more -->

// ************************************************************************************
// POINT CLASS
// ************************************************************************************
function Point (cx, cy, sym) {
	this.svg  = main_svg.append("svg:circle")
						.attr('cx', cx)
						.attr('cy', cy)
						.attr('r' , 1)	
						
	this.svg.attr('fill' , 'white')	
	
	this.x0 = cx
	this.y0 = cy
	
	this.x = cx
	this.y = cy
	
	this.coeff  = 120
	this.coeff2 = Math.random()
	
	this.sym = sym

	this.start = Date.now()

	Point.list[Point.list.length] = this
}

Point.prototype.move 	= function () {
	var t = (Date.now() - this.start)/1250

	// this.svg.attr("transform", function(d) { return "translate(" + (elapsed/v)%l + ")"; })
	
	this.x = this.x0 + Math.pow(Math.cos(t), 3)*this.coeff + Math.pow(Math.sin(t), 7)*this.coeff*this.coeff2 + this.coeff*this.coeff2*0.9
	this.y = this.y0 + Math.pow(Math.sin(t), 3)*this.coeff + Math.pow(Math.cos(t), 7)*this.coeff*this.coeff2 + this.coeff*this.coeff2*0.9
	
	if (this.sym == 0) {
		this.svg.attr('cx', this.x)
		this.svg.attr('cy', this.y)
	} else if (this.sym == 1) {
		this.svg.attr('cx', 750 - this.x)
		this.svg.attr('cy', 750 - this.y)
	} else if (this.sym == 2) {
		this.svg.attr('cx', this.x)
		this.svg.attr('cy', 750 - this.y)
	} else if (this.sym == 3) {
		this.svg.attr('cx', 750 - this.x)
		this.svg.attr('cy', this.y)
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
	if (i<200) {
		for (var j = 0; j<4; j++){
			new Point(150, 150, j)
			new Point(150, 150, j)
		}
		i++
	}
	Point.list.forEach(function(thiz, i){thiz.move()})
}, 1);
