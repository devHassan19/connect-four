/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
/*------------------------ Cached Element References ------------------------*/
const fieldEls = document.querySelectorAll('.field')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('rest')
/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

const column = [[], [], [], [], [], [], []]

const fillRow = () => {
  fieldEls.forEach((field, index) => {
    const fieldIndex = Math.floor(index / 7)
    column[fieldIndex].push(field)
  })
}

fillRow()

const init = () => {
  board = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ]
  turn = 'p1'
  winner = false
  tie = false
}
init()

const updateBoard = () => {
  column.forEach((input, id) => {
    board[id] = input.innerText

    if (input === 'p1') {
      fieldEls[id].style.backgroundColor = 'red'
    } else if (input === 'p2') {
      fieldEls[id].style.backgroundColor = 'blue'
    }
  })
}
function updateMessage() {
  if (tie == false) {
    messageEl.textContent = ' tie no one won'
  } else if (winner == true) {
    messageEl.textContent = `The winner is ${turn}`
  } else {
    messageEl.textContent = `Your turn ${turn}`
  }
  messageEl.textContent = `${turn} turn `
}

const checkForTie = () => {
  if (winner == true) return
  if (board.includes('')) {
    tie = turn
  } else {
    tie = false
  }
}
const changeTurn = () => {
  if (turn == 'p1') {
    turn = 'p2'
  } else if (turn == 'p2') {
    turn = 'p1'
  }
}

const placePiece = (index) => {
  board[index] = turn
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
            turn = 'p2'
          } else if (turn == 'p2') {
            column[i][j].style.backgroundColor = 'red'
            column[i][j].innerText = turn
            board[i][j] = 'p2'
            turn = 'p1'
          }
          console.log()
          break
        }
      }
      break
    }
  }
}

const handleClick = (event) => {
  updateMessage()
  if (!event.target.classList.contains('field')) return

  const fieldIndex = event.target.id
  const index = parseInt(fieldIndex)

  // if (board[index] === 'p1' || board[index] === 'p2' || winner) return
  //checkForTie()
  fillCell(fieldIndex)
  console.log(board)
  // console.log(column)

  checkForTie()
}

fieldEls.forEach((field) => {
  field.addEventListener('click', handleClick)
})
