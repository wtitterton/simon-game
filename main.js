
var lives,score;
var numberOfClicks = 0;
var sequence = [];
var speed = 1500;
var strict = false;
var on = false;
var start = false;
var wrong = false;
var lock = true;



// target DOM elements
var container = document.querySelector('.container');
var pads = document.querySelectorAll('.pad');
var startBtn = document.querySelector('.start');
var strictBtn = document.querySelector('.strict');
var checkBox = document.getElementById('checkBox');
var scoreBoard = document.querySelector('.scoreBoard');

//bind events

function init()
{
	lives = 1;
	score = 1;
	updateScore(scoreBoard,score);
	addToSequence(sequence);
}

function gameScreen(screenToShow)
{
	var overlay = document.createElement('div');
	var htmlString = '';
	if(screenToShow == 'gameOver')
	{
		overlay.classList.add('gameOver');
		htmlString += '<div class="con"> <h1>Game Over</h1>';
		htmlString += '<h4> Your Score: ' + score + '</h4>';
		htmlString += '<h5 class="play-again"> Play Again </h5> </div>';
		overlay.innerHTML = htmlString;
		container.appendChild(overlay);
		var playAgainBtn = document.querySelector('.play-again');
		
		$('.gameOver').delay(1000).animate({
			left:0
		},1000);
		
		playAgainBtn.addEventListener('click',function(){
			
			$('.gameOver').delay(200).animate({
			left:'-100%'
			},
			{
		     duration: 500,
		     complete: function(){
		        restartGame();
   			}
			});
		});
	}
	else if(screenToShow == 'win')
	{
		overlay.classList.add('winner');
		htmlString += '<div class="con"> <h1>Winner</h1>';
		htmlString += '<h4> Your Score: ' + score + '</h4>';
		htmlString += '<h5 class="play-again"> Play Again </h5> </div>';
		overlay.innerHTML = htmlString;
		container.appendChild(overlay);
		$('.winner').delay(500).animate({
			left:0
		},1000);
		var playAgainBtn = document.querySelector('.play-again');
		playAgainBtn.addEventListener('click',function(){
			
			$('.winner').delay(200).animate({
			left:'-100%'
			},
			{
		     duration: 500,
		     complete: function(){
		        restartGame();
   			}
			});
		});

	}
}

function playSound(index)
{
	//play sound
	var sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3','https://s3.amazonaws.com/freecodecamp/simonSound3.mp3','https://s3.amazonaws.com/freecodecamp/simonSound4.mp3','https://s3-us-west-2.amazonaws.com/s.cdpn.io/557191/button-10.mp3','sounds/gameOver.mp3']
	var audio = new Audio(sounds[index]);
	audio.play();
}

function LightUpTarget(elemId,time)
{
	
	switch(elemId)
	{
		case '1':
			$('.LT-light').animate({
			     opacity: 1,
       },time);
			$('.LT-light').animate({
			     opacity: 0
			 },30);
     break;
		case '2':
			$('.RT-light').animate({
			     opacity: 1
			 },time);
			$('.RT-light').animate({
			     opacity: 0
			 },30);
		break;
		case '3':
			$('.RB-light').animate({
				opacity: 1
       },time);
			$('.RB-light').animate({
				    opacity: 0
			},30);
		break;
		case '4':
			$('.LB-light').animate({
				opacity: 1
			},time);
			$('.LB-light').animate({
				opacity: 0
			},30);
		break;

	}
}

function generateRandomNumber(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addToSequence(sequence)
{
	var num = generateRandomNumber(1,4);
	sequence.push(num);
	console.log(sequence);
}


function playSequence(sequence,time)
{
		var i = 0;
		
		function updateIndex(sequence,speed)
		{	
			lock = true;
			var index = i++;
		  	if(index == sequence.length)
		  	{
		  		lock = false;
		  		clearInterval(inter);
		  	}
		  	
		 	return sequence[index];	
		}

			var inter = setInterval(function(){
			var soundToPlay = updateIndex(sequence);
			
			soundToPlay = soundToPlay.toString();
			switch(soundToPlay)
			{
				case '1':
					setTimeout(function(){
						playSound(0);
					},speed)
					LightUpTarget('1',speed);
				break;
				case '2':
					setTimeout(function(){
						playSound(1);
					},speed)
					LightUpTarget('2',speed);
				break;
				case '3':
					setTimeout(function(){
						playSound(2);
					},speed)
					LightUpTarget('3',speed);
				break;
				case '4':
					setTimeout(function(){
						playSound(3);
					},speed)
					LightUpTarget('4',speed);
				break;
			}
		  	
		},speed);
		
		
	}

var checkIfSequenceIsCorrect = function(sequence,idOfBtnClicked)
{
		var isCorrect;
		if( idOfBtnClicked == sequence[numberOfClicks-1].toString())
		{
			wrong = false;
			isCorrect = true;
			
			if(numberOfClicks == sequence.length)
			{	
				score++;
        if(score == 5 || score == 9)
          {
            scoreBoard.innerHTML = 'Level up!';
            setTimeout(function(){
              updateScore(scoreBoard,score);
            },1000);
          }
        else
          {
            updateScore(scoreBoard,score);
          }
			
				increaseSpeed(score);
				if(score == 20)
				{
					gameScreen('win');	
				}
				else
				{
					lives = 1;
					addToSequence(sequence);
					playSequence(sequence,speed);
					numberOfClicks = 0;
				}
				
				return true;
			}
		}	
		else
		{	
			wrong = true;
			isCorrect = false;
			if(strict || lives == 0)
			{
				gameScreen('gameOver');
				playSound(4);
				playSound(5);
				sequence = [];
			}
			else
			{
        scoreBoard.innerHTML = 'Try Again!';
        setTimeout(function(){
          updateScore(scoreBoard,score);
        },1000);
				playSequence(sequence,speed);
				lives--;
				numberOfClicks = 0;
				playSound(4);
				wrong = false;
			}
		}
		return isCorrect;
}

function increaseSpeed(score)
{
	if(score < 5)
	{
		speed = speed;
	}
	else if(score == 5)
	{
		speed = 1200;
	}
	else if(score == 9 )
	{
		speed = 1000;
	}
	else
	{
		speed = 800;
	}
}

function updateScore(elem,score)
{
	elem.textContent = score;
}

function restartGame()
{
	document.location.href = "";
}



checkBox.addEventListener('change', function(){
	if(checkBox.checked)
	{
		on = true;
	}
	else
	{
		on = false;
		start = false;
		restartGame();
	}
});




startBtn.addEventListener('click', function(){
	start = true;
	
	if(on === true && start === true)
	{
		init();
		setTimeout(function(){ playSequence(sequence,speed) }, 300);
		$('.pad').on('click',function(e){
			if(wrong === true || lock === true || start === false || on === false)
			{
				return;
			}

			numberOfClicks++;
			var isCorrect = checkIfSequenceIsCorrect(sequence,e.currentTarget.id);
			var currentElem = e.currentTarget.id;
			var index = parseInt(currentElem);
			
			if(isCorrect)
			{
				playSound(index-1);
			}
			else
			{
				playSound(4);
			}
			
		});
	}

});

$('.light').on('mousedown',function(){
  
  $(this).animate({
    opacity:1
  },10)
});
$('.light').on('mouseup',function(){
  $(this).css({
    opacity:0
   });

});


strictBtn.addEventListener('click', function(){
	strictBtn.classList.toggle('strictOn');
	if(strictBtn.classList.contains('strictOn'))
	{
		strict = true;
	}
	else
	{
		strict = false;
	}
})

