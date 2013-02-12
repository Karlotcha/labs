---
layout: post
title: "Mondrian _ returns"
date: 2013-02-12 23:04
comments: true
categories: 
---

<!-- more -->

function generate_Mondrian(size, white_p, black_p, normal_p, normal_propa_p, horiz_p, horiz_propa_p, verti_p, verti_propa_p){
	// ************************************************************************************
	// FUNCTIONS HELPERS
	// ************************************************************************************
	var rand = function (n) {
			return Math.floor(Math.random()*n)
		}
		
	// ************************************************************************************
	// VARIABLES
	// ************************************************************************************
	var main_svg 	  = d3.select("body").append("svg:svg")

	// ************************************************************************************
	// algorithm used to generate the mapping
	// ************************************************************************************
	  , Cell 		= function(){
			this.used  = false		
	  }
	  , Rect		= function(x, y, w, h, t){
			this.x 		= x
			this.y 		= y
			this.width  = w
			this.height = h
			this.type   = t
			Rect.list.push(this)
	  }

	Cell.matrix	= []
	Rect.list 	= []
	matrix_size = Math.floor(600/size)
	  
	!function(){
		for(var i=0; i<matrix_size; i++) {
			Cell.matrix[i] = []
			for(var j=0; j<matrix_size; j++) {
				Cell.matrix[i][j] = new Cell()
			}
		}
		
		function horiz_propa(){
			if(Cell.matrix[i+1]) h=2

			while(true) {
				new Rect(size*(j+w-1), size*(i), size, size*h, 'horiz')
				if(horiz_propa_p < rand(100)) break
				else {
					if(Cell.matrix[i][j+w]){
						Cell.matrix[i][j+w].used 	 = true
						Cell.matrix[i+h-1][j+w].used = true
						w ++
					} else break
				}
			}
		}
		
		function verti_propa(){
			if(Cell.matrix[i][j+1]) w=2
			
			while(true) {
				new Rect(size*(j), size*(i+h-1), size*w, size, 'verti')
				if(verti_propa_p < rand(100)) break
				else {
					if(Cell.matrix[i+h]){
						Cell.matrix[i+h][j].used 	 = true
						Cell.matrix[i+h][j+w-1].used = true
						h ++
					} else break
				}
			}
		}
		
		function normal_propa(){
			while(true) {
				if(normal_propa_p < rand(100)) break
				else {
					if(Cell.matrix[i][j+w] && !Cell.matrix[i][j+w].used){
						Cell.matrix[i][j+w].used = true
						w ++
					}
				}
			}
			
			while(true) {
				if(normal_propa_p < rand(100)) break
				else {
					if(Cell.matrix[i+h]){
						for (var k =0; k<w; k++) Cell.matrix[i+h][j+k].used = true
						h ++
					}
				}
			}
				
			new Rect(size*j, size*i, size*w, size*h, 'normal')
		}
		
		for(var i=0; i<matrix_size; i++) {
			for(var j=0; j<matrix_size; j++) {
				if(!Cell.matrix[i][j].used) {
					Cell.matrix[i][j].used = true
					var w = 1
					  , h = 1
					  , type
					
					if (rand(2)==0) {
						if	    (normal_p> rand(100)) normal_propa()
						else if	(verti_p > rand(100)) verti_propa()
						else if (horiz_p > rand(100)) horiz_propa()
						else						  normal_propa()
					} else {
						if	    (normal_p> rand(100)) verti_propa()
						else if	(horiz_p > rand(100)) horiz_propa()
						else if (verti_p > rand(100)) verti_propa()
						else 						  normal_propa()
					}
				}
			}
		}
		
		
	}()

	  
	// ************************************************************************************
	// draw rectangle
	// ************************************************************************************
	function draw(x, y, width, height, type) {
	
		var rect = main_svg.append("svg:rect")
				.attr('x', x)
				.attr('y', y)
				.attr('width'  , width)
				.attr('height' , height)
				.attr('fill' , 'white')
				.style("opacity", 0)
		  , color = ''

		if ((white_p < rand(100)) || (type!='normal')) {
			if (black_p < rand(100)) {
				c = rand(3)
				if (c == 0) color = 'red'
				else if (c == 1) color = 'blue'
				else if (c == 2) color = 'yellow'
			} else color = 'black'
		} else color = 'white'
			
		rect.transition()
				.duration(1000)
				.ease(Math.sqrt)
					.style("opacity", 1)
			.transition()
				.delay(1000)
				.duration(1000)
				.ease(Math.sqrt)
					.attr('fill' , color)
	}

	// ************************************************************************************
	// MAIN SCRIPT
	// ************************************************************************************
	$('body').css('background', 'white')
	Rect.list.forEach(function(e){
		draw(e.x, e.y, e.width, e.height, e.type)
	})
	main_svg.append("svg:polygon")
			.attr('points', '0 0 0 300 300 0')
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', '0 300 0 600 300 600')
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', '300 0 600 0 600 300')
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', '600 300 300 600 600 600')
			.attr('fill' , 'white')

}

// variables from controller
var size		  = 10
  , white_p		  = 50
  , black_p 	  = 10
  , normal_p 	  = 60
  , normal_propa_p= 80  
  , horiz_p 	  = 5
  , horiz_propa_p = 95
  , verti_p 	  = 5
  , verti_propa_p = 70

generate_Mondrian(size, white_p, black_p, normal_p, normal_propa_p, horiz_p, horiz_propa_p, verti_p, verti_propa_p)