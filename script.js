let player = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
const gameStatus = document.querySelector('.game');
const tilesArr = document.querySelectorAll('.tile');
const currentPlayer = document.querySelector('.currentPlayer');

tilesArr.forEach(function(tile) {
  tile.addEventListener('click', handleTileClick);
});

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' &&
        board[i][0] === board[i][1] && 
        board[i][1] === board[i][2]) {
      return true; // Row win
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] !== '' && 
        board[0][j] === board[1][j] && 
        board[1][j] === board[2][j]) {
      return true; // Column win
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && 
      board[0][0] === board[1][1] && 
      board[1][1] === board[2][2]) {
    return true; // Diagonal win
  }
  if (board[0][2] !== '' && 
      board[0][2] === board[1][1] && 
      board[1][1] === board[2][0]) {
    return true; // Diagonal win
  }

  return false; // No win yet
}

function checkDraw() {
  for (let i = 0; i < tilesArr.length; i++) {
    if (tilesArr[i].textContent === '') {
      return false;
    }
  }

  return console.log('draw');
}

function resetGame() {
  tilesArr.forEach(tile => {
    tile.textContent = '';
  });

  player = 'X';
  currentPlayer.innerHTML = `Current player: ${player}`;
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  document.getElementById('winner').textContent = '';
  gameActive = true;

  tilesArr.forEach(tile => {
    tile.addEventListener('click', handleTileClick);
  })
}



function handleTileClick (event) {
  if (!gameActive) {
    console.log('game is over');
    return;
  }
  const clickedTile = event.target;
  const index = clickedTile.dataset.index;

  if (clickedTile.textContent === '') {
    clickedTile.textContent = player;

    const row = Math.floor(index / 3);
    const col = index % 3;
    board[row][col] = player;

    if (checkWin() || checkDraw()) {
      if (player === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
      } else {
        scoreO++;
        document.getElementById('scoreO').textContent =scoreO;
      }
      document.getElementById('winner').textContent = player + ' wins!';
      endGame();
    } else {
      console.log(player);
      currentPlayer.innerHTML = `Current player: ${player}`;
      player = player === 'X' ? 'O' : 'X';
    }
  }
}

function endGame() {
  gameActive = false;

  tilesArr.forEach(tile => {
    tile.removeEventListener('click', handleTileClick);
  })
}