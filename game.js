$(window).on('load', function() {

    buttonColours = ['green', 'red', 'yellow', 'blue']
    gamePattern = []
    userClickedPattern = []

    let started = false
    let level = 0

    const gameStart = $(document).keypress(function(e) {
        if (!started) {
            nextSequence()
            started = true
        }
    });

    function playSound(color) {
        sound = new Audio(`sounds/${color}.mp3`)
        sound.play()
    }

    // reset the game
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

    function checkAnswer() {
        for (let currentLevel = 0; currentLevel < gamePattern.length; currentLevel++) {
            if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
                if (currentLevel == gamePattern.length - 1) {
                    setTimeout(function() {
                        nextSequence();
                    }, 1000);
                }
            } else {
                playSound("wrong");
                $("body").addClass("game-over");
                $("#level-title").text("Game Over, Press Any Key to Restart");

                setTimeout(function() {
                    $("body").removeClass("game-over")
                }, 200);

                startOver();
            }
        }
    }

    $('.btn').click(function() {
        let userChosenColor = $(this).attr('id')
        userClickedPattern.push(userChosenColor)
        playSound(userChosenColor)

        // When the length of both arrays are the same, check the answer
        if (userClickedPattern.length === gamePattern.length) {
            checkAnswer();
        }
    });

    function nextSequence() {
        userClickedPattern = []
        level++
        $("#level-title").text("Level " + level);

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColours[randomNumber]
        gamePattern.push(randomChosenColor);

        const sleep = (time) => {
            return new Promise(resolve => setTimeout(resolve, time))
        }

        const doSomething = async() => {
            for (let index = 0; index < gamePattern.length; index++) {
                $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index])
                await sleep(500)
            }
        }

        doSomething()

    }

});