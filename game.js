const element = query => document.querySelector(query)

window.onload = () => {

    buttonColors = ['green', 'red', 'yellow', 'blue']
    gamePattern = []
    userClickedPattern = []

    let started = false
    let level = 0

    element('.start').addEventListener('click', () => {
        if (!started) {

            let time = 5
            const title = element("#level-title")
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
            element("#level-title").textContent = "Game Over, Press 'r' to Restart";

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

    window.onclick = event => {
        if (event.target.classList.contains("button")) {
            pushChoice(event.target.firstElementChild.getAttribute("id"))
        }
    }

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

}
