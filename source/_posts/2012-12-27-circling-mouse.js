---
layout: post
title: "'circling' mouse"
date: 2012-12-27 00:54
comments: true
categories: 
---

<!-- more -->
// ************************************************************************************
// GLOBAL VARIABLES
// ************************************************************************************
var main_svg 	= d3.select("body").append("svg:svg").on("mousemove", sparking)
  
// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************

function sparking() {
	var m = d3.svg.mouse(this);

	main_svg.append("svg:circle")
	.attr("cx", m[0])
	.attr("cy", m[1])
	.attr("r", 1e-6)
	.style("stroke", 'red')
	.style("stroke-opacity", 1)
	.transition()
		.duration(2000)
			.ease(Math.sqrt)
			.attr("r", 10)
			.style("stroke", 'blue')
	.transition()
		.duration(2000).delay(1500)
			.style("stroke-opacity", 1e-6)
			.remove();
}