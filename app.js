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
  board.forEach((input, id) => {
    fieldEls[id].textContent = input

    if (input === 'p1') {
      fieldEls[id].style.backgroundColor = 'red'
    } else if (input === 'p2') {
      fieldEls[id].style.backgroundColor = 'blue'
    }
  })
}
function updateMessage() {
  if (tie == true) {
    messageEl.textContent = ' tie no one won'
  } else if (winner == true) {
    messageEl.textContent = `The winner is ${turn}`
  } else {
    messageEl.textContent = `Your turn ${turn}`
  }
  messageEl.textContent = turn
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
    console.log(isHere)
    if (isHere) {
      for (let j = 0; j < column[i].length; j++) {
        if (column[i][j].style.backgroundColor == '') {
          if (turn == 'p1') {
            column[i][j].style.backgroundColor = 'blue'
            turn = 'p2'
          } else if (turn == 'p2') {
            column[i][j].style.backgroundColor = 'red'
            turn = 'p1'
          }
          break
        }
      }
      break
    }
  }
}

const _fillCell = (clickedColumn) => {
  clickedColumn.style.backgroundColor = turn
  clickedColumn.innerText = turn
  console.log({ turn })
}

const handleClick = (event) => {
  console.log(event.target.innerText)
  updateMessage()
  if (!event.target.classList.contains('field')) return

  const fieldIndex = event.target.id
  const index = parseInt(fieldIndex)

  if (board[index] === 'p1' || board[index] === 'p2' || winner) return

  fillCell(fieldIndex)

  //placePiece(index)
  //changeTurn()
  //updateBoard()
}

fieldEls.forEach((field) => {
  field.addEventListener('click', handleClick)
})
