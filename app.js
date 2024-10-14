/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
/*------------------------ Cached Element References ------------------------*/
const startGame = document.getElementById('start')
const fieldEls = document.querySelectorAll('.field')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('rest')
/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

const column = [[], [], [], [], [], []]

const fillRow = () => {
  fieldEls.forEach((field, index) => {
    const fieldIndex = Math.floor(index / 7)
    column[fieldIndex].push(field)
  })
}

fillRow()

const iinit = () => {
  board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]
  turn = 'p1'
  winner = false
  tie = false
}
const init = () => {
  board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]
  turn = 'p1'
  winner = false
  tie = false
  fieldEls.forEach((field) => {
    field.innerText = ''
    field.style.backgroundColor = ''
  })
}

const startNewGame = () => {
  init()
  messageEl.textContent = `Your turn: ${turn}`
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `The winner is ${turn}`
    return
  } else if (tie) {
    messageEl.textContent = 'No one won'
  } else {
    messageEl.textContent = `Your turn: ${turn}`
  }
}

const rest = () => {
  board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ]
  turn = 'p1'
  winner = false
  tie = false

  fieldEls.forEach((field) => {
    field.style.backgroundColor = ''
    field.innerText = ''
  })
  updateMessage()
}
const changeTurn = () => {
  if (winner == true) return
  turn = turn === 'p1' ? 'p2' : 'p1'
}

const checkForTie = () => {
  if (winner) return

  tie = true

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') {
        tie = false
        return
      }
    }
  }
}

const checkForWinner = () => {
  winningCombos.forEach((win) => {
    const [a, b, c, d] = win
    if (
      board[Math.floor(a / 7)][a % 7] !== '' &&
      board[Math.floor(a / 7)][a % 7] === board[Math.floor(b / 7)][b % 7] &&
      board[Math.floor(a / 7)][a % 7] === board[Math.floor(c / 7)][c % 7] &&
      board[Math.floor(a / 7)][a % 7] === board[Math.floor(d / 7)][d % 7]
    ) {
      winner = true
      return
    }
  })
}

const fillCell = (index) => {
  for (let i = 0; i < column.length; i++) {
    let isHere = column[i].some((div) => {
      if (div.id === index) {
        return true
      }
    })
    if (isHere) {
      for (let j = 0; j < column[i].length; j++) {
        if (column[i][j].style.backgroundColor == '') {
          if (turn == 'p1') {
            column[i][j].style.backgroundColor = 'blue'
            column[i][j].innerText = turn
            board[i][j] = 'p1'
          } else if (turn == 'p2') {
            column[i][j].style.backgroundColor = 'red'
            column[i][j].innerText = turn
            board[i][j] = 'p2'
          }

          break
        }
      }
      break
    }
  }
}

const handleClick = (event) => {
  if (winner) return
  if (!event.target.classList.contains('field')) return
  const fieldIndex = event.target.id
  const index = parseInt(fieldIndex)

  fillCell(fieldIndex)
  checkForWinner()
  checkForTie()
  changeTurn()
  updateMessage()
  console.log(board)
}
startGame.addEventListener('click', startNewGame)

fieldEls.forEach((field) => {
  field.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', rest)
const winningCombos = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 10, 17, 24],
  [4, 11, 18, 25],
  [5, 12, 19, 26],
  [6, 13, 20, 27],
  [21, 15, 9, 3],
  [22, 16, 10, 4],
  [23, 17, 11, 5],
  [24, 18, 12, 6],
  [28, 22, 16, 10],
  [29, 23, 17, 11],
  [30, 24, 18, 12],
  [31, 25, 19, 13],
  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [3, 11, 19, 27],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [10, 18, 26, 34]
]
