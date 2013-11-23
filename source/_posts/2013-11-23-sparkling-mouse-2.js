---
layout: post
title: "sparkling mouse 2"
date: 2013-11-23 20:13
comments: true
categories: 
---

<!-- more -->

$('body').append('<canvas id="canvas" width="1000" height="1000" style="border:1px solid red;"></canvas>')


// ************************************************************************************
// POINT CLASS
// ************************************************************************************
function Point (x, y, r, g, b, a) {
  this.x = x
  this.y = y
  this.r = r
  this.g = g
  this.b = b
  this.a = a

  this.vx = Math.random() - Math.random()
  this.vy = Math.random() - Math.random()

  this.index = Point.list.length
  Point.list[this.index] = this

  this.draw()
}

Point.prototype.move  = function () {
  this.x = this.x + this.vx
  this.y = this.y + this.vy
  this.a = this.a - 1

  if (this.x > width || this.y > height || this.x < 0 || this.y < 0)
    delete Point.list[this.index]
}

Point.prototype.draw  = function () {
  drawPixel (Math.floor(this.x), Math.floor(this.y), this.r, this.g, this.b, this.a)
}

Point.list = []

// ************************************************************************************
// FUNCTIONS HELPERS
// ************************************************************************************
function rand (n) {
 return Math.floor(Math.random()*n)
}

function drawPixel (x, y, r, g, b, a) {
  var index = (x + y * width) * 4

  image.data[index + 0] = r
  image.data[index + 1] = g
  image.data[index + 2] = b
  image.data[index + 3] = a
}

function updateCanvas() {
    ctx.putImageData(image, 0, 0)
}

// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************
var c   = document.getElementById("canvas")
  , ctx = c.getContext("2d")
  , width = c.width
  , height = c.height
  , core_x = width/2
  , core_y = height/2
  , image = ctx.getImageData(0, 0, width, height)

$(window).mousemove(function(e){
  if (e.pageX < width) core_x = e.pageX
  if (e.pageY < height) core_y = e.pageY
})

setInterval(function() {
  new Point(core_x, core_y, 255, rand(255), rand(255), 255)
  new Point(core_x, core_y, 255, rand(255), rand(255), 255)
  new Point(core_x, core_y, 255, rand(255), rand(255), 255)
  new Point(core_x, core_y, 255, rand(255), rand(255), 255)
  new Point(core_x, core_y, 255, rand(255), rand(255), 255)

  image = ctx.createImageData(width, height)
  Point.list.forEach(function(thiz, i){thiz.move(); thiz.draw()})
  updateCanvas()
}, 1)