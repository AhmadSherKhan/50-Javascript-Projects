let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let spaces = Array(9).fill(null)
let winnerindicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const X_TEXT = 'X'
const O_TEXT = 'O'
let currentplayer = X_TEXT
let countplays = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click' , boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if ( spaces[id] == null && countplays < 9){
        spaces[id] = currentplayer
        e.target.innerText = currentplayer

        if(playerhaswon() !==false ){
            playerText.innerText = currentplayer + ' has won'
            let winning_block = playerhaswon()
            countplays = 10
            winning_block.map(box => boxes[box].style.backgroundColor = winnerindicator)
        }
        countplays++
        currentplayer = currentplayer == X_TEXT ? O_TEXT : X_TEXT
    }

    if(countplays === 9 ){
        playerText.innerHTML = "Draw Game"
        boxes.forEach(box => box.style.color = 'red')
    }
}

const winningcombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function playerhaswon(){
    for (const condition of winningcombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click' , restart)

function restart(){
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    countplays = 0
    playerText.innerText = "Tic Tac Toe"
    currentplayer = X_TEXT
}

startGame()