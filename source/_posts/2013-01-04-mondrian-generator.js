---
layout: post
title: "Mondrian generator"
date: 2013-01-04 01:21
comments: true
categories: 
---

// Press any key to generate again

<!-- more -->

function generate_Mondrian(){
	// ************************************************************************************
	// FUNCTIONS HELPERS
	// ************************************************************************************
	var rand = function (n) {
			return Math.floor(Math.random()*n)
		}
		
	// ************************************************************************************
	// GLOBAL VARIABLES
	// ************************************************************************************
	var main_svg 	  = d3.select("body").append("svg:svg")
	  , border		  = 5
	  , smallest_rect = 50

	// ************************************************************************************
	// algorithm used to generate the mapping, absolute messy code, don't look at it, PLEASE 
	// ************************************************************************************
	  , Cell 		= function(){
			this.used  = false		
	  }
	  , Rect		= function(x, y, w, h){
			this.x 		= x
			this.y 		= y
			this.width  = w
			this.height = h
			Rect.list.push(this)
	  }

	Cell.matrix	= []
	Rect.list =[]
	  
	!function(){
		for(var i=0; i<10; i++) {
			Cell.matrix[i] = []
			for(var j=0; j<10; j++) {
				Cell.matrix[i][j] = new Cell()
			}
		}
		
		for(var i=0; i<10; i++) {
			for(var j=0; j<10; j++) {
				if(!Cell.matrix[i][j].used) {
					Cell.matrix[i][j].used = true
					var w = 1
					  , h = 1
					  
					while(true) {
						var r = rand(2)
						if(r) break
						else {
							if(Cell.matrix[i][j+w] && !Cell.matrix[i][j+w].used){
								Cell.matrix[i][j+w].used = true
								w ++
							}
						}
					}
					
					while(true) {
						r = rand(2)
						if(r) break
						else {
							if(Cell.matrix[i+h]){
								for (var k =0; k<w; k++) Cell.matrix[i+h][j+k].used = true
								h ++
							}
						}
					}
					
					var rect_total = smallest_rect + 2*border
					  , x 		   = rect_total*j + border
					  , y		   = rect_total*i + border
					  , width	   = rect_total*w - 2*border
					  , height	   = rect_total*h - 2*border
						
					
					new Rect(x, y, width, height)
				}
			}
		}
		
		
	}();

	  
	// ************************************************************************************
	// generate rectangle
	// ************************************************************************************
	function generate(x, y, width, height) {
		var rect = main_svg.append("svg:rect")
				.attr('x', x)
				.attr('y', y)
				.attr('width'  , width)
				.attr('height' , height)
				.attr('fill' , 'white')
				.style("opacity", 0)

		  , c = rand(28)
		  , color = ''
		if (c == 0) 	 color = 'black'
		else if (c == 1) color = 'red'
		else if (c == 2) color = 'blue'
		else if (c == 3) color = 'yellow'
		else 			 color = 'white'
		
		rect.transition()
				.delay(2000)
				.duration(1000)
				.ease(Math.sqrt)
					.style("opacity", 1)
			.transition()
				.delay(3000)
				.duration(1000)
				.ease(Math.sqrt)
					.attr('fill' , color)
		
		main_svg.append("svg:rect")
			.attr('x', x-border)
			.attr('y', y-border)
			.attr('fill' , 'black')
			.attr('height' , border)
			.transition()
			.duration(1000)
				.attr('width'  , width + 2*border)
		main_svg.append("svg:rect")
			.attr('x', x + width)
			.attr('y', y)
			.attr('fill' , 'black')
			.attr('width'  , border)
			.transition()
			.duration(1000)
			.delay(1000)
				.attr('height' , height + border)
		main_svg.append("svg:rect")
			.attr('x', x -border)
			.attr('y', y)
			.attr('width'  , border)
			.attr('fill' , 'black')
			.transition()
			.duration(1000)
				.attr('height' , height + border)
		main_svg.append("svg:rect")
			.attr('x', x)
			.attr('y', y + height)
			.attr('height' , border)
			.attr('fill' , 'black')
			.transition()
			.duration(1000)	
			.delay(1000)
				.attr('width'  , width)
		
	}

	// ************************************************************************************
	// MAIN SCRIPT
	// ************************************************************************************
	$('body').css('background', 'grey')

	Rect.list.forEach(function(e){
		generate(e.x, e.y, e.width, e.height)
	})
}
   
generate_Mondrian()

// press any key to generate again
$(document).live('keydown', function(){
	d3.select("svg").remove()
	generate_Mondrian()
})