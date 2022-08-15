$(window).on('load', function() {

    buttonColours = ['green', 'red', 'yellow', 'blue']
    gamePattern = []
    userClickedPattern = []

    let started = false
    let level = 0

    const gameStart = $('.start').bind('touchstart click', function(e) {
        if (!started) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
            started = true
            $('.menu').toggleClass('active')
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
        $('.start').toggleClass('active')
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
                $("#level-title").text("Game Over, Press 'r' to Restart");

                setTimeout(function() {
                    $("body").removeClass("game-over")
                }, 200);

                startOver()

                document.addEventListener("touchstart", () => {
                    started = true;
                    setTimeout(() => {
                        nextSequence()
                    }, 1000);
                    e.preventDefault()
                })

                $(document).keypress(function(e) {
                    if (e.key == 'r') {
                        started = true;
                        setTimeout(() => {
                            nextSequence()
                        }, 500);
                        e.preventDefault()
                    }
                })
            }
        }
    }

    function pushChoice(key) {
        let userChosenColor = $('#' + key).parent().attr('id');
        userClickedPattern.push(userChosenColor)

        $("#" + key).parent().toggleClass("active");
        setTimeout(() => {
            $("#" + key).parent().removeClass("active");
        }, 150);

        playSound(userChosenColor)

        // When the length of both arrays are the same, check the answer
        if (userClickedPattern.length === gamePattern.length) {
            checkAnswer();
        }
    }

    $('.btn').click(function() {
        pushChoice(this)
    });

    $(document).keypress(function(event) {
        switch (event.key) {
            case 'a':
                pushChoice('a')
                event.preventDefault()
                break;

            case 's':
                pushChoice('s')
                event.preventDefault()
                break;

            case 'd':
                pushChoice('d')
                event.preventDefault()

                break;

            case 'f':
                pushChoice('f')
                event.preventDefault()

                break;

            default:
                break;
        }
    })

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
                $("." + gamePattern[index]).toggleClass("active");
                setTimeout(() => {
                    $("." + gamePattern[index]).removeClass("active");
                }, 150);
                playSound(gamePattern[index])
                await sleep(500)
            }
        }

        doSomething()

    }

    function disableSelect(el) {
        if (el.addEventListener) {
            el.addEventListener("mousedown", disabler, "false");
        }
        if (el.addEventListener) {
            el.addEventListener("keydown", disabler, "false");
        } else {
            el.attachEvent("onselectstart", disabler);
        }
    }

    document.querySelectorAll(".key").forEach(element => {
        disableSelect(element)
    });

    function disabler(e) {
        if (e.preventDefault) { e.preventDefault(); }
        return false;
    }
});

console.log(screen.width);
screen.width < 1190 ? $('.game').css('height', '100%') : $('.game').css('height', '80%')