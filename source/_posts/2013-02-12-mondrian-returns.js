---
layout: post
title: "Mondrian _ returns"
date: 2013-02-12 23:04
comments: true
categories: 
---

<!-- more -->

function generate_Mondrian(){
	// ************************************************************************************
	// VARIABLES
	// ************************************************************************************
	var main_svg = d3.select("body").append("svg:svg")
	  , WHITE    = '#F4EEE0'
	  , colors1	 = ['#D1DAC2', '#BBBFAA', '#AFAEA7', '#E2C903', '#1525B1', '#B40B01']
	  , colors2	 = ['#B6AD6C', '#DCC50C', '#C2AA66', '#790606', '#1F29B6', '#080A1B']
	  , size		  = 6
	  , total_size	  = 600
	  , white_p		  = 50
	  , black_p 	  = 10
	  , normal_propa_p= 95
	  , horiz_p 	  = 2
	  , horiz_propa_p = 99
	  , verti_p 	  = 2
	  , verti_propa_p = 97
	  
	// ************************************************************************************
	// FUNCTIONS HELPERS
	// ************************************************************************************
	var rand = function (n) {
			return Math.floor(Math.random()*n)
		}
		

	// ************************************************************************************
	// algorithm used to generate the mapping
	// ************************************************************************************
	  , Cell = function(){
			this.used  = false		
	  }
	  , Rect = function(x, y, w, h, t){
			this.x 		= x
			this.y 		= y
			this.width  = w
			this.height = h
			this.type   = t
			Rect.list.push(this)
	  }

	Cell.matrix	= []
	Rect.list 	= []
	matrix_size = Math.floor(total_size/size)
	  
	!function(){
		for(var i=0; i<matrix_size; i++) {
			Cell.matrix[i] = []
			for(var j=0; j<matrix_size; j++) {
				Cell.matrix[i][j] = new Cell()
			}
		}
		
		function horiz_propa(){
			var w = 1
			  , h = 1
			if(j==20) var horiz_p = 15
			if(Cell.matrix[i+1]) h=2
			
			if (horiz_p > rand(100)) {
				Cell.matrix[i][j].used     = true
				Cell.matrix[i+h-1][j].used = true
				loop:
				while(true) {
					new Rect(size*(j+w-1), size*(i), size, size*h, 'horiz')
					if(false) break loop
					else {
						if(Cell.matrix[i][j+w]){
							Cell.matrix[i][j+w].used 	 = true
							Cell.matrix[i+h-1][j+w].used = true
							w ++
						} else break loop
					}
				}
			}
		}
		
		function verti_propa(){
			var w = 1
			  , h = 1
			if(i==0) var verti_p = 7
			if(Cell.matrix[i][j+1]) w=2
			
			if	(verti_p > rand(100)) {
				Cell.matrix[i][j].used     = true
				Cell.matrix[i][j+w-1].used = true
				while(true) {
					if(verti_propa_p < rand(100)) break
					else {
						if(Cell.matrix[i+h]){
							new Rect(size*(j), size*(i+h-1), size*w, size, 'verti')
							Cell.matrix[i+h][j].used 	 = true
							Cell.matrix[i+h][j+w-1].used = true
							h ++
						} else break
					}
				}
			}
		}
		
		function normal_propa(){
			if(!Cell.matrix[i][j].used) {
				Cell.matrix[i][j].used = true
				var w = 1
				  , h = 1
				
				loop:
				while(true) {
					if(normal_propa_p < rand(100)) break loop
					else {
						if(Cell.matrix[i][j+w] && !Cell.matrix[i][j+w].used){
							Cell.matrix[i][j+w].used = true
							w ++
						} else break loop
					}
				}
				
				loop:
				while(true) {
					if(normal_propa_p < rand(100)) break loop
					else {
						if(Cell.matrix[i+h]) {
							for (var k =0; k<w; k++)
								if(Cell.matrix[i+h][j+k].used)
									break loop
							 
							for (var k =0; k<w; k++) Cell.matrix[i+h][j+k].used = true
							h ++
						} else break loop
					}
				}
				
				new Rect(size*j, size*i, size*w, size*h, 'normal')
			}
		}

		for(var i=0; i<matrix_size; i++) for(var j=0; j<matrix_size; j++) horiz_propa()
		for(var i=0; i<matrix_size; i++) for(var j=0; j<matrix_size; j++) verti_propa()
		for(var i=0; i<matrix_size; i++) for(var j=0; j<matrix_size; j++) normal_propa()
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
				.attr('fill' , WHITE)
				.style("opacity", 0)
		  , color = ''
		if (type == 'normal') {
			if ((white_p < rand(100))) {
				if (black_p < rand(100)) {
					color = colors1[rand(6)]
				} else color = 'black'
			} else color = WHITE
		}
		
		if (type != 'normal') {
			if (black_p < rand(100)) {
				color = colors2[rand(6)]
			} else color = 'black'
		}
		
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
	
	L = String(total_size) + ' '
	l = String(total_size/2) + ' '
	O = '0' + ' '
	
	main_svg.append("svg:polygon")
			.attr('points', O + O + O + l + l + O)
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', O + l + O + L + l + L)
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', l + O + L + O + L + l)
			.attr('fill' , 'white')
	main_svg.append("svg:polygon")
			.attr('points', L + l + l + L + L + L)
			.attr('fill' , 'white')

}

generate_Mondrian()

// press any key to generate again
$(document).live('keydown', function(){
	d3.select("svg").remove()
	generate_Mondrian()

})