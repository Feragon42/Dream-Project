function createMap(){
	ctx.fillStyle='rgb(192,192,192)'
	ctx.fillRect(0,0,400,400)
	var mapx=0,mapy=0, k=0

	/*ctx.fillStyle='rgb(0,0,0)'
	ctx.fillRect(0,40,40,40)*/

	map=[[8,8,8,8,8,8,8,8,8,8]
		,[8,0,0,0,0,0,8,0,8,8]
		,[8,8,0,0,0,0,0,0,0,8]
		,[8,0,0,8,8,0,0,8,0,0]
		,[8,0,0,0,8,8,0,8,8,8]
		,[8,0,8,0,0,0,0,8,0,8]
		,[8,8,8,8,0,0,0,0,0,8]
		,[8,8,8,0,0,8,8,0,8,8]
		,[8,0,0,0,8,8,8,0,0,8]
		,[8,8,8,8,8,8,8,8,8,8]]

	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			if(map[i][j]==8){
			ctx.fillStyle='rgb(0,0,0)'
			ctx.fillRect(mapx,mapy,40,40)
				if(mapy==320){
					solidPiecex[k]=mapx
					k++
				}		
			}
			mapx+=40
		}
		mapx=0
		mapy+=40				
	}	
}

function createChar(){
	ctx.fillStyle='rgb(0,0,255)'
	ctx.fillRect(posCharx,posChary,12,30)
}

function move(){

	addEventListener('keydown', function(e){
		keypress=e.keyCode
		if(stop==false){
			if(keypress==39)
				posCharx+=2
			if(keypress==37)
				posCharx-=2
		}
		if(keypress==38)
			jump()

		createMap()
		createChar()
		makeSolid()

	},false)
}

function makeSolid(){
	for(i=0;i<10;i++){
		if(posCharx>=solidPiecex[i]-12 && posCharx<=solidPiecex[i]+40){
			stop=true
			if(posCharx==solidPiecex[i]-12 && keypress==37)
				stop=false	
			if(posCharx==solidPiecex[i]+40 && keypress==39)
				stop=false
			break	
		}

	}

}

function jump(){
	var charJump=0
	while(charJump<=44){
		posChary-=2
		charJump+=2
		createMap()
		createChar()
	}
}