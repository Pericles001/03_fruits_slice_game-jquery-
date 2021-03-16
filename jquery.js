var playing = false;
var score;
var trialsleft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'pear', 'watermelon'];
var step;
var action;
$(function () {
    //click on start reset button 
    $("#startreset").click(function () {
        //we are playing
        if (playing == true) {
            //reload page 
            location.reload();
        } else {

            //we are not playing
            playing = true;
            //game initiated
            //set score to zero
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();
            //hide gameover box
            $("#gameOver").hide();

            //change button text to reset game
            $("#startreset").html("Reset Game");
        }

        //start sending fruits
        startAction();

    });

    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score); //update score
//        document.getElementById("slicesound").play();
                    $("#slicesound")[0].play();
        //play sound

        //stop fruit 

        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 500); //slice fruit

        //send a new fruit

        setTimeout(startAction, 500);

    }); //slice a fruit



    function addHearts() {
        $("#trialsleft").empty();
        for (i = 0; i < trialsleft; i++) {
            $("#trialsleft").append('<img src="images/heart.png" class="life">');
        }

    }

    function startAction() {
        //generate a fruit

        //start sending fruits
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({
            'left': Math.round(550 * Math.random()),
            'top': -50
        });
        //random position

        //define a random step
        step = 1 + Math.round(5 * Math.random());
        //change step

        //move fruit down by one step every 30sec
        action = setInterval(function () {
            //move the fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit by one step
            //is fruit too low ?
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                //check if we have any trials left 
                if (trialsleft > 1) {
                    //generate a fruit

                    //start sending fruits
                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({
                        'left': Math.round(55 * Math.random()),
                        'top': -50
                    });
                    //random position

                    //define a random step
                    step = 1 + Math.round(5 * Math.random());
                    //change step
                    //reduce number of trials by one 
                    trialsleft--;
                    //populate trials left box
                    addHearts();
                } else {
                    //game over
                    playing = false; //we are not playing anymore
                    $("#startreset").html("Start Game")
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over ! </p><p>You score is ' + score + '</p>');
                    $("#trialsleft").hide();
                    stopAction();
                }
            }
        }, 10);

        //no-> repeat nb2
        //yes-> any trial left ?
        //yes : create a new random heart , remove one heart and continue
        //no: game over, button text: start game

        //play sound
        //
    }
    //generate a random fruit

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');

    }

    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});
