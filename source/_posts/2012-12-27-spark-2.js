---
layout: post
title: "spark (2)"
date: 2012-12-27 13:49
comments: true
categories: 
---

<!-- more -->
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
	
  , spark = function () {
		var cx = Math.cos((Date.now() - start)/1000)*200 + 400
		  , cy = Math.sin((Date.now() - start)/1000)*200 + 300

		main_svg.append("svg:circle")
		.attr("cx", cx)
		.attr("cy", cy)
		.attr("r", 1)
		.attr("fill" , 'yellow')	
		.style("opacity", 1)
		.transition()
			.duration(1500)
				.ease(Math.sqrt)
				.attr("cx", cx + rand(80) - 40)
				.attr("cy", cy + rand(80) - 40)
				.style("fill", 'red')
				.remove();
  }
  
// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************

setInterval(function() {
	spark()
	spark()
	spark()
}, 1);
