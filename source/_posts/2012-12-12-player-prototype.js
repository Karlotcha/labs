---
layout: post
title: "player: prototype"
date: 2012-12-12 00:39
comments: true
categories: 
---

<!-- more -->
// use the arrow keys to move!

// ************************************************************************************
// PLAYER CLASS
// ************************************************************************************
function Player () {
	this.x = 100
	this.y = 100
	this.alpha = 0
	
	this.svg  = main_svg.append("svg:rect")
						.attr('x', this.x)
						.attr('y', this.y)
						.attr('width'  , 40)
						.attr('height' , 10)
						.attr('id', 'player1')	
	this.svg.attr('fill' , 'white')		
}

Player.prototype.move 	= function (direction) {
	if (direction == 'up') 		{ 
		this.x += 1*Math.cos(this.alpha*Math.PI/180)
		this.y += 1*Math.sin(this.alpha*Math.PI/180)
	}
	else if (direction == 'down') 	{ 
		this.x -= 1*Math.cos(this.alpha*Math.PI/180)
		this.y -= 1*Math.sin(this.alpha*Math.PI/180)
	}
	else if (direction == 'left') 	{ 
		this.alpha -= 1
	}
	else if (direction == 'right') 	{ 
		this.alpha += 1
	}
	
	this.svg.attr('x', this.x)
	this.svg.attr('y', this.y)
	cx = this.x + 20
	cy = this.y + 5
	this.svg.attr('transform' , 'rotate(' + this.alpha +' '+ cx +' '+ cy +')')	
}

// ************************************************************************************
// GLOBAL VARIABLES
// ************************************************************************************
var main_svg 	= d3.select("body").append("svg:svg")
  , player1 	= new Player()
  , keys 		= {}
  
// ************************************************************************************
// FUNCTIONS HELPERS
// ************************************************************************************
  , rand = function (n) {
		return Math.floor(Math.random()*n)
    }
  
// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************

// keyboard controls
$(document).live('keydown', function(e){
    keys[e.which] = true
	return false
})

$(document).live('keyup', function(e){
	delete keys[e.which]
})

setInterval(function() {
	if (keys[38]) player1.move('up')
	if (keys[40]) player1.move('down')
	if (keys[37]) player1.move('left')
	if (keys[39]) player1.move('right')
}, 1);
