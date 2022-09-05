import { useEffect } from "react";

const GameComponent = () => {

    useEffect(() => {
        const bird = document.querySelector('.bird')
        const gameDisplay = document.querySelector('.game-container')
        const ground = document.querySelector('.ground-moving')

        let birdLeft = 220
        let birdBottom = 100
        let gravity = 3
        let isGameOver = false
        let gap = 430
        let score = 0;


        function startGame() {
            birdBottom -= gravity;
            bird.style.bottom = birdBottom + 'px'
            bird.style.left = birdLeft + 'px'
        }
        let gameTimerId = setInterval(startGame, 20)

        function jump() {
            if (birdBottom < 500) birdBottom += 50
            bird.style.bottom = birdBottom + 'px'
        }

        document.addEventListener('click', jump)

        function generateObstacle() {
            let obstacleLeft = 500
            let randomHeight = Math.random() * 60
            let obstacleBottom = randomHeight
            const obstacle = document.createElement('div')
            const topObstacle = document.createElement('div')
            if (!isGameOver) {
                obstacle.classList.add('obstacle')
                topObstacle.classList.add('topObstacle')
                score++
            }
            gameDisplay.appendChild(obstacle)
            gameDisplay.appendChild(topObstacle)
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            obstacle.style.bottom = obstacleBottom + 'px'
            topObstacle.style.bottom = obstacleBottom + gap + 'px'

            function moveObstacle() {
                obstacleLeft -= 2
                obstacle.style.left = obstacleLeft + 'px'
                topObstacle.style.left = obstacleLeft + 'px'

                if (obstacleLeft === -60) {
                    clearInterval(timerId)
                    gameDisplay.removeChild(obstacle)
                    gameDisplay.removeChild(topObstacle)
                }
                if (
                    obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                    (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                    birdBottom === 0
                ) {
                    gameOver()
                    clearInterval(timerId)
                }
            }
            let timerId = setInterval(moveObstacle, 20)
            if (!isGameOver) {
                setTimeout(generateObstacle, 3000)
            }
        }
        generateObstacle()


        function gameOver() {
            clearInterval(gameTimerId)
            isGameOver = true
            document.removeEventListener('click', jump)
            ground.classList.add('ground')
            ground.classList.remove('ground-moving')
            alert(`Game Over!! Score: ${Math.floor(score - 1)}`)
        }

    }, [])

    return (
        <>
            <div className="border-left"></div>
            <div className="game-container">
                <div className="border-top"></div>
                <div className="sky">
                    <div className="bird"></div>
                </div>
            </div>
            <div className="ground-container">
                <div className="ground-moving"></div>
            </div>
            <div className="border-right"></div>
        </>
    )
}

export default GameComponent;