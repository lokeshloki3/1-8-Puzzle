const matrix = document.querySelector('.matrix');
const moveCounterElement = document.getElementById('moveCounter');
const winnerElement = document.querySelector('.winner');

const cells = [1,2,3,4,5,6,7,8,null];

let gameOver = false;

let moveCount = 0;

function shuffle(cells) {
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }
}

// check if game is solvable -> https://math.stackexchange.com/a/838818

function gameSolvable(cells) {
  let inversions = 0;
  for (let i = 0; i < cells.length; i++)
    for (let j = i+1; j < cells.length; j++)
      if (cells[i] != null && cells[j] != null && cells[i] > cells[j])
        inversions++;
  return inversions % 2 == 0;
}

function displayMatrix(){
    
    matrix.innerHTML = '';

    while (true) {
      shuffle(cells);
      if (gameSolvable(cells))
        break;
    }
    
    cells.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell === null) {
        cellElement.textContent='';
      } else {
        cellElement.textContent = cell;
      }
      matrix.appendChild(cellElement);
    });
    // Reset move count for new game
    moveCount=0;
    moveCounterElement.textContent = `Moves: ${moveCount}`;
    // Clear previous winner message
    winnerElement.textContent = ''; 
}

displayMatrix();

let allCells;

function updateCellReferences() {
    allCells = document.querySelectorAll('.cell');
}

function isEmptyTile(idx) {
  return (idx >= 0 && idx < 9 && allCells[idx].innerHTML == '')
}

function checkWinner() {
  for (let i = 0; i < allCells.length - 1; i++) {
    if (allCells[i].innerHTML != i + 1) {
      return false; // If any cell is not in the correct position
    }
  }
  return true; // If all cells are correct
}

function puzzle(){
  allCells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      // console.log('clicked index', index);
      // console.log('clicked cell',cell.innerHTML);
      // console.log(this.id);
      // allCells[index+1].innerHTML='Lokesh';

      // Prevent clicks after win
      if (gameOver)
        return;

      // Track if a move was made
      let moved = false;

      if (isEmptyTile(index-3)) {
        // Swap with the tile above
        temp = allCells[index].innerHTML;
        allCells[index].innerHTML=allCells[index-3].innerHTML;
        allCells[index-3].innerHTML=temp;
        moved=true;
      } else if (isEmptyTile(index+3)) {
        // Swap with the tile below
        temp = allCells[index].innerHTML;
        allCells[index].innerHTML=allCells[index+3].innerHTML;
        allCells[index+3].innerHTML=temp;
        moved=true;
      } else if (index % 3 > 0 && isEmptyTile(index-1)) {
        // Swap with the tile to the left
        temp = allCells[index].innerHTML;
        allCells[index].innerHTML=allCells[index-1].innerHTML;
        allCells[index-1].innerHTML=temp;
        moved=true;
      } else if (index % 3 < 2 && isEmptyTile(index+1)) {
        // Swap with the tile to the right
        temp = allCells[index].innerHTML;
        allCells[index].innerHTML=allCells[index+1].innerHTML;
        allCells[index+1].innerHTML=temp;
        moved=true;
      }
      // Update move count only if a move was made
      if (moved) {
        moveCount++;
        moveCounterElement.textContent = `Moves: ${moveCount}`; // Update the displayed move count
      }

      if (checkWinner()) {
        gameOver = true;
        winnerElement.textContent = 'Player wins!';
    }
    // console.log('player wins');
      // temp = allCells[3].innerHTML;
      // allCells[3].innerHTML=allCells[4].innerHTML;
      // allCells[4].innerHTML=temp;
      // cell.innerHTML='Lokesh';
      // [cell[4],cell[5] =cell[5],cell[4]];
      // console.log(e.currentTarget);
      
      // if(index+3 > 8)
      // {
      //   temp = allCells[index].innerHTML;
      //   allCells[index].innerHTML=allCells[index-3].innerHTML;
      //   allCells[index-3].innerHTML=temp;
      // }
      // else
      // {
      //   temp = allCells[index].innerHTML;
      //   allCells[index].innerHTML=allCells[index+3].innerHTML;
      //   allCells[index+3].innerHTML=temp;
      // }
      // else if(index%3==0){
      //   temp = allCells[index].innerHTML;
      //   allCells[index].innerHTML=allCells[index+1].innerHTML;
      //   allCells[index+1].innerHTML=temp;
      // }
      // else if(index%3==2){
      //   temp = allCells[index].innerHTML;
      //   allCells[index].innerHTML=allCells[index-1].innerHTML;
      //   allCells[index-1].innerHTML=temp;
      // }
      
    }
  );
  });
}

updateCellReferences();
puzzle();


const restart = document.querySelector('.newGame');
restart.addEventListener('click',() => {
  gameOver = false;
  displayMatrix();
  updateCellReferences();
  puzzle();
})