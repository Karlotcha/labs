---
layout: post
title: "Mandelbrot set"
date: 2013-01-11 22:48
comments: true
categories: 
---

// Use your mouse to zoom

<!-- more -->

// ************************************************************************************
// UI
// ************************************************************************************
$('body').prepend(	  '<div id="UI" style="background: grey; padding: 10px 5px 10px 5px; margin-bottom: 10px;"> '
					+ '<label for="x_min"> x_min : 	</label>	<input id = "x_min" type="number" value = "-1.5"  />' 
					+ '<label for="x_max"> x_max : 	</label>	<input id = "x_max" type="number" value = "0.5" />' 
					+ '<label for="y_min"> y_min : 	</label>	<input id = "y_min" type="number" value = "-1"   />' 
					+ '<label for="y_max"> y_max : 	</label>	<input id = "y_max" type="number" value = "1"    />' 
					+ '<label for="max_iteration"> luminosity : 	</label>	<input id = "max_iteration" type="number" value = "100"    />' 
					+ '<label for="acc"> accuracy : </label>	<input id = "acc" type="range" value = "100" min = "100" max="600" step = "100" />' 
					+  '</div>'
					+  '<div id="time" style="color: white;"> PRESS ENTER TO GENERATE </div>')
					
// ************************************************************************************
// GLOBAL VARIABLES
// ************************************************************************************
	var x_min  	= parseFloat($('#x_min').attr('value'))
	  , x_max  	= parseFloat($('#x_max').attr('value'))
	  , y_min  	= parseFloat($('#y_min').attr('value'))
	  , y_max  	= parseFloat($('#y_max').attr('value'))
	  , width  	= 600
	  , height 	= 600

// ************************************************************************************
// MAIN FUNCTION
// ************************************************************************************
function generate() {
	// ************************************************************************************
	// VARIABLES
	// ************************************************************************************
	var start 	= Date.now()
	  , svg		= d3.select("body").append("svg:svg")
	  , x_acc  	= parseFloat($('#acc').attr('value'))
	  , y_acc  	= parseFloat($('#acc').attr('value'))
	  , max_iteration =  parseFloat($('#max_iteration').attr('value'))
	  
	x_min  	= parseFloat($('#x_min').attr('value'))
	x_max  	= parseFloat($('#x_max').attr('value'))
	y_min  	= parseFloat($('#y_min').attr('value'))
	y_max  	= parseFloat($('#y_max').attr('value'))
		
	// ************************************************************************************
	// FUNCTIONS HELPERS
	// ************************************************************************************
	  , x_x	   	= d3.scale.linear().domain([0, x_acc]).range([x_min, x_max])
	  , y_y		= d3.scale.linear().domain([0, y_acc]).range([y_min, y_max])
	  , x_px	= d3.scale.linear().domain([0, x_acc]).range([0, width])
	  , y_px	= d3.scale.linear().domain([0, y_acc]).range([0, height])
	  , color	= function(iteration) {
					var shade = 255*(iteration/max_iteration)
					return d3.rgb( shade, shade, shade).toString()
				}
	  , plot 	= function(i, j, iteration) {
					svg.append("svg:circle")
						.attr("cx", x_px(i))
						.attr("cy", y_px(j))
						.attr("r", width/(2*x_acc))
						.attr("fill" , color(iteration))
				}
	  
	// ************************************************************************************
	// MAIN SCRIPT
	// ************************************************************************************

	for (var i = 0; i < x_acc; i++) {
		for (var j = 0; j < y_acc; j++) {
			var x0 = x_x(i)
			  , y0 = y_y(j)
			  , x  = 0
			  , y  = 0
			  , iteration = 0
			  
			while ( x*x + y*y < 4  &&  iteration < max_iteration ) {
				xtemp = x*x - y*y + x0
				y = 2*x*y + y0
				x = xtemp
				iteration++
			}
			
			plot(i,j, iteration)
		}
	}
	
	var timer = (Date.now() - start)/1000
	$('#time').html('Generated in: '+ timer +'s')
}

// ************************************************************************************
// ZOOM
// ************************************************************************************
var X0, Y0

$('svg')
	.live('mousedown', function(e0){
		var $rect = $('<div class="rect_selection" style="border: solid 1px; position:absolute; opacity: 0.5;"></div>')

		$rect.css('border-color', '#0033FF').css('background-color','#A8CAEC')

		Y0 = e0.pageY
		X0 = e0.pageX

		$('body').append($rect)
		$rect.css('left', X0).css('top', Y0)

		$('body').live('mousemove',function(e) {
			var X	 = e.pageX
			  , Y	 = e.pageY
			  , difX = X-X0
			  , difY = Y-Y0
			  , dif  = Math.max(Math.abs(difX), Math.abs(difY))

			if (difX>0 && difY>0) $rect.css('left', X0).width(dif).css('top', Y0).height(dif)
		})
		return false
	})
var zoom = function(e1){
				var Y1 = e1.pageY
				  , X1 = e1.pageX
				$('body').die('mousemove')
				$('.rect_selection').remove()
				
				var offset = $('svg').offset()
				  , x_min_pix = X0 - offset.left
				  , x_max_pix = X1 - offset.left
				  , y_min_pix = Y0 - offset.top
				  , y_max_pix = X1 - offset.top
				  , x_conv	  = d3.scale.linear().domain([0, width]).range([x_min, x_max])
				  , y_conv	  = d3.scale.linear().domain([0, height]).range([y_min, y_max])
				  , x_min_true	= x_conv(x_min_pix)
				  , x_max_true	= x_conv(x_max_pix)
				  , y_min_true	= y_conv(y_min_pix)
				  , y_max_true	= y_min_true + Math.abs(x_max_true - x_min_true)
				
				$('#x_min').attr('value', x_min_true)  
				$('#x_max').attr('value', x_max_true)  
				$('#y_min').attr('value', y_min_true)  
				$('#y_max').attr('value', y_max_true)  

				d3.select("svg").remove()
				generate()		
			}
$('.rect_selection').live('mouseup', zoom)
$('svg').live('mouseup', zoom)

// ************************************************************************************
// press enter to generate
// ************************************************************************************
$(document).live('keydown', function(e){
	if (e.which == 13) {
		d3.select("svg").remove()
		generate()
	}
})