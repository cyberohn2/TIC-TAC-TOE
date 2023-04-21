let currentPlayer = 'X'
const cells = Array.from(document.querySelectorAll('.cell'))
const statusText = document.querySelector('.status-text')
let hasStarted = false
let onePlayer = false
let options = ['','','','','','','','','']
let winChances = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//function to initialize game
startGame()
function startGame() {
    hasStarted = true
    cells.forEach(cell =>{
        cell.textContent = ''
    }) 
    options = ['','','','','','','','','']
    currentPlayer = 'X'
    statusText.textContent = `${currentPlayer}'s turn`
}
//Updating each cells
    cells.forEach(cell =>{
        cell.addEventListener('click', (e) =>{
            e.preventDefault()
            if (hasStarted) {
            let cellIndex = cell.getAttribute('data-index')
            if (options[cellIndex] != '') {
                return
            }
            options[cellIndex] = currentPlayer
            cell.textContent = currentPlayer
            checkWinner()
            }
            
        })
    })
function checkWinner() {
    let thereIsAWinner = false
    for (let i = 0; i < winChances.length; i++) {
        const chance = winChances[i];
        let firstCell = options[chance[0]]
        let secCell = options[chance[1]]
        let thirdCell = options[chance[2]]
        
        if (firstCell == '' || secCell == '' || thirdCell == '') {
            continue
        }
        if (firstCell == secCell && secCell == thirdCell) {
            thereIsAWinner = true
            break
        }
    }
    if (thereIsAWinner) {
        statusText.textContent = `${currentPlayer} Won!!`
        hasStarted = false
    } else if(!options.includes('')){
        statusText.textContent = `No Winner`
        hasStarted = false
    }else{
        currentPlayer = currentPlayer == 'X'? 'O': 'X'
        statusText.textContent = `${currentPlayer}'s turn`
    }
}

//to restart game
const restartBtn = document.querySelector('.reset-btn')
restartBtn.addEventListener('click', startGame)