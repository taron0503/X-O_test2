$(document).ready(function(){

function Board(size){
	self = this;
	this.size = size;
	this.victoryCount = 3;

	this.player1 = {
		Name:'User',
		Sign:'X',
		Color:'green',
		Play:function(id){
			$('#'+id).html('<span style = "color:'+this.Color+'">'+this.Sign+'</span>');
		}
	}

	this.player2 = {
		Name:'Computer',
		Sign:'O',
		Color:'red',
		Play:function(){
			var arr = Array();
			$('td').each(function(){
				if($(this).text() == '')
					arr.push($(this).attr('id'));
			})
			var item = arr[Math.floor(Math.random()*arr.length)];	
			$('#'+item).html('<span style = "color:'+this.Color+'">'+this.Sign+'</span>');
			if(self.CheckVictory(this,item)){
				$('td').off();					
			}
		}
	};

	this.Init = function(size){
		this.creatBoard(size);
		this.SelectPlayer();

		$('td').on('click',function(){
			if($(this).text() == ''){
				var id = $(this).attr('id');
				self.player1.Play(id);
				if(self.CheckVictory(self.player1,id)){
					$('td').off();
				}else{
					self.player2.Play();
				}
			}
		})

	}

	this.creatBoard = function(){
		var id = 0;
		for(var i = 0; i < this.size; i++){
			var temp = $('<tr>');

			for(var j = 0; j < this.size; j++){
				temp.append($('<td/>', {'id':id++}));
			}
			$('#game').append(temp);
		}
	}


	this.CheckVictory = function(player,id){
		var count = 0;

		//horizontal check
		$('tr').each(function(){
			count = 0;
			$(this).find('td').each(function(){
				if($(this).text() == player.Sign){
					count++
				}else{
					count = 0
				}
				if(count == self.victoryCount)
					alert(player.Name + " Won");
					return true;
			})
		})


		//vertival check

		for(var i = 0; i < this.size; i++){
			count = 0;
			$('tr td:nth-child('+i+')').each(function(){
				console.log(this)
				if($(this).text() == player.Sign){
					count++
				}else{
					count = 0
				}
				if(count == self.victoryCount)
					alert(player.Name + " Won");
					return true;
			})
		}

		//diagonal check

		var temp1 = 0;
		var temp2 = this.size;
		for(var i = this.size; i > 0; i--){
			count = 0;

			for(var j = 0; j < i; j++){
				// console.log(($('#'+(temp1))));

				if($('#'+(temp1)).text() == player.Sign){
					count++
					temp1+=this.size+1;
				}else{
					temp1+=this.size+1;
					count =0;
				}
				if(count == this.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
				
			}
			temp1 = this.size-i+1;


			temp2 = this.size * (this.size - i +1) ;
			for(var k = this.size; k < this.size * i; k+= this.size){
				if($('#'+(temp2)).text() == player.Sign){
					count++;
					temp2+=this.size+1;
				}else{
					temp2+=this.size+1;
					count = 0;
				}
				if(count == this.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
			}


		}

		var temp3 = this.size-1;
		var temp4;
		for(var i = this.size; i > 0; i--){
			count = 0;

			for(var j = this.size-1; j > 0; j--){
				// console.log(($('#'+(temp3))));

				if($('#'+(temp3)).text() == player.Sign){
					count++
					temp3+=this.size-1;
				}else{
					temp3+=this.size+1;
					count =0;
				}
				if(count == this.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
				
			}
			temp3 = i -2;


			temp4 = (this.size - i + 2) * this.size - 1; 
			for(var k = this.size; k < this.size * i; k+= this.size){

				if($('#'+(temp4)).text() == player.Sign){
					count++;
					temp4+=this.size-1;
				}else{
					temp4+=this.size+1;
					count = 0;
				}
				if(count == this.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
			}


		}

		
		if(this.CheckDraw()){
			alert('Draw');
			return true;
		}

		return false;
	}

	this.CheckDraw = function(){
		var length = $('td').length;
		for(var i  = 0; i < length; i++){
			if($('td').eq(i).text() == '')
				return false
		}
		return true;
	}

	this.SelectPlayer = function(){
		if(confirm("First move make computer") == true){;
		alert(this.player2.Name + "Computer start!")
		this.player2.Play();
		}else{
			alert(this.player1.Name + " start!")
		}
	}



}


$('#start').on("click", function(){
	$('#game').empty();
	var count = $('#Count').val();
	var game = new Board(count);
	game.Init();
})


})
