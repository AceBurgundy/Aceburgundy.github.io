
const element = query => document.querySelector(query)
const elements = query => document.querySelectorAll(query)

window.onload = () => {

    buttonColors = ['green', 'red', 'yellow', 'blue']
    gamePattern = []
    userClickedPattern = []
    const title = element("#level-title")
    
    let started = false
    let level = 0

    // start button clicked
    element('.start').addEventListener('click', () => {
        if (!started) {

            let time = 5
            element('.menu').classList.toggle('active')

            const countDown = setInterval(() => {
                if (time !== 0) {
                    time--
                    title.textContent = `Watch out for the sequence in ${time}`
                } else {
                    clearInterval(countDown)
                    nextSequence()
                    started = true
                }        
            }, 1000)
        }
    })
    
    // plays sound
    const playSound = color => {
        sound = new Audio(`sounds/${color}.mp3`)
        sound.play()
    }

    // reset the game
    const startOver = () => {
        level = 0
        gamePattern = []
        started = false
        element('.start').classList.toggle('active')
    }

    // checks answer
    const checkAnswer = () => {
        
        const currentIndex = userClickedPattern.length - 1;
        const currentButtonColor = userClickedPattern[currentIndex];
        const currentPatternColor = gamePattern[currentIndex];

        if (currentButtonColor === currentPatternColor) {

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }

        } else {
            playSound("wrong");
            element("body").classList.add("game-over");
            title.textContent = "Game Over, Press 'r' to Restart";

            setTimeout(() => {
                element("body").classList.remove("game-over");
            }, 200);

            startOver();

            window.addEventListener("keypress", event => {
                if (event.key === "r") {
                    started = true;
                    setTimeout(() => {
                        nextSequence();
                    }, 500);
                    event.preventDefault();
                }
            });
        }

    };

    // called by button pressed and keyboared pressed events
    const pushChoice = key => {

        let userChosenColor = element(`#${key}`).parentElement.getAttribute('id')
        userClickedPattern.push(userChosenColor)

        checkAnswer()

        element(`#${key}`).parentElement.classList.toggle("active")

        setTimeout(() => {
            element(`#${key}`).parentElement.classList.toggle("active")
        }, 150)

        playSound(userChosenColor)

    }

    //runs when a button is pressed
    window.onclick = event => {
        if (event.target.classList.contains("button")) {
            pushChoice(event.target.firstElementChild.getAttribute("id"))
        }
    }

    // runs when a keyboard key is pressed
    window.addEventListener("keypress", event => {

        switch (event.key) {
            case 'a':
                pushChoice('a')
                event.preventDefault()
                break

            case 's':
                pushChoice('s')
                event.preventDefault()
                break

            case 'd':
                pushChoice('d')
                event.preventDefault()

                break

            case 'f':
                pushChoice('f')
                event.preventDefault()

                break

            default:
                break
        }        
    })

    // shows next pattern sequence
    const nextSequence = () => {

        userClickedPattern = []
        level++

        element("#level-title").textContent = `"Level" ${level}`

        let randomNumber = Math.floor(Math.random() * 4)
        let randomChosenColor = buttonColors[randomNumber]
        gamePattern.push(randomChosenColor)

        const sleep = (time) => {
            return new Promise(resolve => setTimeout(resolve, time))
        }

        const showPattern = async() => {

            for (let index = 0; index < gamePattern.length; index++) {

                element("." + gamePattern[index]).classList.add("active")

                setTimeout(() => {
                    element("." + gamePattern[index]).classList.remove("active")
                }, 150)

                playSound(gamePattern[index])
                await sleep(500)
            }

        }

        showPattern()
    }

    // START BUTTON TEXT RESIZER

    function handleOrientationChange() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            window.fitText(title, 3.5)
        }
    }
    
    elements(".key").forEach(key => window.fitText(key, 0.2))
    
    window.addEventListener("orientationchange", handleOrientationChange);
    
    handleOrientationChange();
    
    //END BUTTON TEXT RESIZER
}
