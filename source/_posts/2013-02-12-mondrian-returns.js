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
	  , SIZE		  = 6
	  , TOTAL_SIZE	  = 600
	  
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

	Cell.matrix	= []
	matrix_SIZE = Math.floor(TOTAL_SIZE/SIZE)
	  
	!function(){
		for(var i=0; i<matrix_SIZE; i++) {
			Cell.matrix[i] = []
			for(var j=0; j<matrix_SIZE; j++) Cell.matrix[i][j] = new Cell()
		}
		
		var normal_propa_p_h = 90
		  , normal_propa_p_v = 97
		  , horiz_p 	  	 = 1
		  , horiz_p2      	 = 1
		  , horiz_propa_p 	 = 99
		  , verti_p 	  	 = 1
		  , verti_propa_p 	 = 97
		
		function horiz_propa(){
			var w = 1
			  , h = 1
			if(j==15) horiz_propa_p = 10000
			if(j==20) horiz_p2 *= 2
			
			if(Cell.matrix[i+1]) h=2
			
			if (j>15 && j<25 && horiz_p2>rand(10000) ) {
				horiz_p2 = 1
				Cell.matrix[i][j].used     = true
				Cell.matrix[i+h-1][j].used = true
				loop:
				while(true) {
					draw(SIZE*(j+w-1), SIZE*(i), SIZE, SIZE*h, 'horiz')
					if(horiz_propa_p < rand(100)) break loop
					else {
						if((j+w)==80) horiz_propa_p = 80
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

			if(Cell.matrix[i][j+1]) w=2
			
			if	(verti_p > rand(1000)) {
				Cell.matrix[i][j].used     = true
				Cell.matrix[i][j+w-1].used = true
				while(true) {
					if(verti_propa_p < rand(100)) break
					else {
						if(Cell.matrix[i+h]){
							draw(SIZE*(j), SIZE*(i+h-1), SIZE*w, SIZE, 'verti')
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
					if(normal_propa_p_h < rand(100)) break loop
					else {
						if(Cell.matrix[i][j+w] && !Cell.matrix[i][j+w].used){
							Cell.matrix[i][j+w].used = true
							w ++
						} else break loop
					}
				}
				
				loop:
				while(true) {
					if(normal_propa_p_v < rand(100)) break loop
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
				
				draw(SIZE*j, SIZE*i, SIZE*w, SIZE*h, 'normal')
				if (0==rand(3)) draw(SIZE*(j+rand(w)/2), SIZE*(i+rand(h)/2), SIZE*(rand(w)/2+1), SIZE*(rand(h)/2+1), 'normal')
			}
		}

		for(var i=0; i<matrix_SIZE; i++) for(var j=0; j<matrix_SIZE; j++) horiz_propa()
		for(var i=0; i<matrix_SIZE; i++) for(var j=0; j<matrix_SIZE; j++) verti_propa()
		for(var i=0; i<matrix_SIZE; i++) for(var j=0; j<matrix_SIZE; j++) normal_propa()
	}()

	  
	// ************************************************************************************
	// draw rectangle
	// ************************************************************************************
	function draw(x, y, width, height, type) {
	
		var rect = main_svg.append("svg:rect")
				.attr('x', rand(600))
				.attr('y', rand(600))
				.attr('width'  ,(60))
				.attr('height' , (60))

		  , color = ''
		  
		if (type == 'normal') {
				if (20 < rand(100)) {
					color = ['#D1DAC2', '#BBBFAA', '#AFAEA7', '#E2C903', '#1525B1', '#B40B01'][rand(6)]
			} else color = '#F4EEE0'
		}
		
		if (type != 'normal') {
			if (10 < rand(100)) {
				color = ['#B6AD6C', '#DCC50C', '#C2AA66', '#790606', '#1F29B6', '#080A1B'][rand(6)]
			} else color = 'black'
		}
		
		rect.attr('fill' , color)
			.transition()
				.duration(5000)
				.ease('cubic-out')
				.attr('x', x)
				.attr('y', y)
				.attr('width'  , width)
				.attr('height' , height)

	}

	// ************************************************************************************
	// finish move
	// ************************************************************************************
	$('svg').css('height', 600)
	$('svg').css('width', 600)
	
	L = String(TOTAL_SIZE) + ' '
	l = String(TOTAL_SIZE/2) + ' '
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