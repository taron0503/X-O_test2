$(document).ready(function(){

function Board(size){
	self = this;
	this.size = size;
	this.victoryCount = this.size;

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
			if(self.CheckVictory(this)){
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


	this.CheckVictory = function(player){
		var count = 0;

		//horizontal check

		var tr = $('tr');
		for(var i = 0; i < tr.length; i++){
			var td = tr.eq(i).find('td');
			for(var j = 0; j < td.length;j++){
				if(td.eq(j).text() == player.Sign){
					count++;
				}else{
					count =0;
					break;
				}
				if(count == this.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
			}
		}


		//vertival check



		for(var i = 0; i < this.size; i++){
			count = 0;
			var td = $('tr td:nth-child('+i+')');
			for(var j = 0; j < this.size; j++){
				if(td.eq(j).text() == player.Sign){
					count++
				}else{
					count = 0
				}
				if(count == self.victoryCount){
					alert(player.Name + " Won");
					return true;
				}
					
			}
		}
			
		

		// //diagonal check

		var id = 0;
		while(id <= Math.pow(this.size,2)){
			
			if($('#'+id).text() == player.Sign){
				count++;
				id += this.size + 1;
			}else{
				console.log(count);
				count = 0;
				break;
			}
			if(count == this.victoryCount){
				alert(player.Name + " Won");
				return true;
			}
		}


		id = this.size - 1;
		while(id <= this.size * (this.size - 1)){
			
			if($('#'+id).text() == player.Sign){
				count++;
				id += this.size - 1;
			}else{
				console.log(count);
				count = 0;
				break;
			}
			if(count == this.victoryCount){
				alert(player.Name + " Won");
				return true;
			}
		}

		//CheckDraw
		
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
		alert(this.player2.Name + " start!")
		this.player2.Play();
		}else{
			alert(this.player1.Name + " start!")
		}
	}



}


$('#start').on("click", function(){
	$('#game').empty();
	var count = Number($('#Count').val());
	var game = new Board(count);
	game.Init();
})


})
