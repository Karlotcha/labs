---
layout: post
title: "blue attack"
date: 2013-11-02 22:09
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

  this.c = 0
  this.dir = 0

  this.index = Point.list.length
  Point.list[this.index] = this

  this.draw()
}

Point.prototype.move  = function () {
  this.c += 1

  if (this.c == 10) {
    this.c = 0
    this.d = rand(3)
  }

  if (this.d==0)
    this.x -= 1
  else if (this.d==1)
    this.x += 1

  this.y +=1

  this.draw()
}

Point.prototype.draw  = function () {
  drawPixel (this.x, this.y, this.r, this.g, this.b, this.a)
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
  , image = ctx.getImageData(0, 0, width, height)

setInterval(function() {
  new Point(width/2, 0, 0, 0, 255, rand(255))
  Point.list.forEach(function(thiz, i){thiz.move()})
  updateCanvas()
}, 1)