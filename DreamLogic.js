 window.reqAF = (function(callback) {
        return window.requestAnimationFrame  
            || window.webkitRequestAnimationFrame  
            || window.mozRequestAnimationFrame 
            || window.oRequestAnimationFrame  
            || window.msRequestAnimationFrame 
            || function(callback) { window.setTimeout(callback, 1000 / 60) }
  })()

var ctx = document.getElementById('map').getContext('2d')
  , map
  , stop       = 0  
  , keyQuick   = {}

var Map = function(){
  this.x = 0
  this.y = 0
  this.solidPiece = new Array()
  this.tile = [[8,8,8,8,8,8,8,8,8,8]
              ,[8,0,0,0,0,0,8,0,8,8]
              ,[8,8,0,0,0,0,0,0,0,8]
              ,[8,0,0,8,8,0,0,8,0,0]
              ,[8,0,0,0,8,8,0,8,8,8]
              ,[8,0,8,0,0,0,0,8,0,8]
              ,[8,8,8,8,0,0,0,0,0,8]
              ,[8,8,8,0,0,8,8,0,8,8]
              ,[8,0,0,0,8,8,8,0,0,8]
              ,[8,8,8,8,8,8,8,8,8,8]]

  Map.prototype.createMap = function(){
    ctx.fillStyle = 'rgb(192, 192, 192)'
    ctx.fillRect(0, 0, 1000, 700)

    this.y = 0

    for(var i = 0; i < 10; i++){
      for(var j = 0; j < 10 ;j++){
        if(this.tile[i][j] === 8){
          ctx.fillStyle = 'rgb(0,0,0)'
          ctx.fillRect(this.x, this.y, 100, 70)
        }
        this.x += 100
      }
      this.x = 0
      this.y += 70       
    }
  }

  Map.prototype.makeSolid = function(){
    for(i = 0; i < 10; i++){
      this.solidPiece[i] = new Array()
      for(j = 0; j < 10; j++){
        if(this.tile[i][j] === 0)
          this.solidPiece[i][j] = 0
        if(this.tile[i][j] === 8)
          this.solidPiece[i][j] = this.x
        this.x += 100
      }
      this.x = 0       
    }  
  }

  Map.prototype.verSolid = function(){
    var solidY = 0

  	for(i = 0; i < 10; i++){
      solidY += 70
      if(blue.y+60 === solidY){
        for(j = 0; j < 10; j++){
          if(blue.x === this.solidPiece[i][j]-30)
            stop = 1
          if(blue.x === this.solidPiece[i][j]+100)
            stop = 2
        }
  		}
  	}
  }
}

var Player = function() {
	this.x = 104
	this.y = 570
	this.w = 30
	this.h = 60
  this.vel = 2
  this.keyDown = {}

	Player.prototype.createChar = function() {
		ctx.fillStyle='rgb(0,0,255)'
		ctx.fillRect(this.x,this.y,this.w,this.h)
	}
	Player.prototype.move = function(){
    if(39 in this.keyDown){
      if(stop !== 1){
        this.x += this.vel
        stop = 0
      }
    }

    if(37 in this.keyDown){
      if(stop !== 2){
        this.x -= this.vel
        stop = 0
      }
    }  

    if(16 in this.keyDown)
      this.vel = 6

    if(32 in this.keyDown)
      this.jump()

    this.createChar()
  }

  Player.prototype.jump = function() {
    
    alert("WIIIII ESTOY SALTANDO!!!... no... en realidad no u.u")
  }	
}

var stage1 = new Map()
var blue = new Player()

addEventListener('keydown', function(e){
  blue.keyDown[e.keyCode] = true
}, false)

addEventListener('keyup', function(e){
  delete blue.keyDown[e.keyCode]
  blue.vel = 2
}, false)

blue.createChar()
stage1.makeSolid()


!function main() {
  ctx.clearRect(0,0,400,400)
  stage1.createMap()
  stage1.verSolid()
  blue.move()
  reqAF(function(){
    main()
  })
}()
