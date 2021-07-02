let turn = '';
let turn_num = 0;
let turn_cnt = 0;
let score = [];
let board = [];

function createTable() {
  const table = document.querySelector('section#game table');
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      td.id = 'idx' + (i * 10 + j);
      td.addEventListener('click', handleClick);
      tr.appendChild(td);
    }
  }
}

function handleClick(e) {
  if (e.target.innerHTML) return;

  turn_cnt++;
  addMark(e.target);
  const idx = Number(e.target.id.substring(3));
  board[parseInt(idx / 10)][idx % 10] = turn_num;

  if (checkWin(parseInt(idx / 10), idx % 10)) {
    alert(`${turn} WIN !!`);
    addScore();
    resetGame();
  } else if (turn_cnt == 9) {
    alert('Tie Game !!');
    resetGame();
  } else {
    changeTurn();
  }
}

function checkWin(i, j) {
  // 세로, 가로
  let sero_cnt = 0,
    garo_cnt = 0;
  for (let k = 0; k < 3; k++) {
    if (board[k][j] == turn_num) sero_cnt++;
    if (board[i][k] == turn_num) garo_cnt++;
  }
  if (sero_cnt == 3 || garo_cnt == 3) return true;

  // 대각선
  if (board[0][0] == turn_num && board[1][1] == turn_num && board[2][2] == turn_num) return true;
  if (board[0][2] == turn_num && board[1][1] == turn_num && board[2][0] == turn_num) return true;

  return false;
}

function addMark(target) {
  target.innerHTML = turn;
  target.className = `turn-${turn.toLowerCase()}`;
}

function addScore() {
  score[turn_num]++;
  document.querySelectorAll('section#score span')[turn_num].innerHTML = score[turn_num];
}

function changeTurn() {
  turn = turn == 'X' ? 'O' : 'X';
  turn_num = 1 - turn_num;
}

function newGame() {
  score = [0, 0];
  document.querySelectorAll('section#score span').forEach((e) => (e.innerHTML = 0));
  resetGame();
}

function resetGame() {
  turn = 'X';
  turn_num = 0;
  turn_cnt = 0;
  board = [];
  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
      board[i].push(-1);
      document.querySelector(`td#idx${i * 10 + j}`).innerHTML = '';
    }
  }
}

window.onload = function () {
  createTable();
  newGame();
  document.querySelector('#newGameBtn').addEventListener('click', newGame);
  document.querySelector('#resetBtn').addEventListener('click', resetGame);
};
