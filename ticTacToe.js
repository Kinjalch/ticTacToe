/* board is a matrix that represents the board, positions below */
var board = [['', '', ''], // board[0][0] board[0][1] board[0][2]
             ['', '', ''], // board[1][0] board[1][2] board[1][2]
             ['', '', '']] // board[2][0] board[2][1] board[2][2]

var turns = 0;
var redWins = 0;
var blueWins = 0;
var winner = null;

/* helper functions */
function isOcc(row, col, $square) { // returns true if occupied
    if (board[row][col] !== '') {
        console.log("occupied square");
        $square.effect('shake');
        return true;
    }
    return false;
}

function placeX(row, col, $square) { // places an X on the board
    if(isOcc(row, col, $square)) return;
    turns++;
    board[row][col] = 'X';
    $square.css("background-color", "red");
    pb();
    checkWin();
}

function placeO(row, col, $square) { // places an O on the board
    if(isOcc(row, col, $square)) return;
    turns++;
    board[row][col] = 'O';
    $square.css("background-color", "blue");
    pb();
    checkWin();
}

function pb() { // prints board in console
    console.log("-------------");
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
}

function checkRow(rowIndex) { // checks for row wins
    var xs = 0;
    var os = 0;
    for (var i = 0; i < 3; i++) {
        if (board[rowIndex][i] === 'X') xs++;
        if (board[rowIndex][i] === 'O') os++;
    }
    if (xs === 3) {
        console.log("X row win");
        winner = 'X';
        return 'X';
    }
    if (os === 3) {
        console.log("O row win");
        winner = 'O';
        return 'O';
    }
    else return null;
}

function checkCol(colIndex) { // checks for col wins
  var xs = 0;
  var os = 0;
  for (var i = 0; i < 3; i++) {
      if (board[i][colIndex] === 'X') xs++;
      if (board[i][colIndex] === 'O') os++;
  }
  if (xs === 3) {
      console.log("X col win");
      winner = 'X';
      return 'X';
  }
  if (os === 3) {
      console.log("O col win");
      winner = 'O';
      return 'O';
  }
  else return null;
}

function checkDiag() { // checks for diagonal wins, janks
  if((board[0][0]=== 'X' && board[1][1]=== 'X' && board[2][2]=== 'X')
  || (board[0][2]=== 'X' && board[1][1]=== 'X' && board[2][0]=== 'X')){
    console.log("X diagonal win");
    winner = 'X';
    return 'X';
  }
  if((board[0][0]=== 'O' && board[1][1]=== 'O' && board[2][2]=== 'O')
  || (board[0][2]=== 'O' && board[1][1]=== 'O' && board[2][0]=== 'O')){
    console.log("O diagonal win");
    winner = 'O';
    return 'O';
  }
  else return null;
}

function checkWin() { //checks win conditions
  for(var i = 0; i < 3; i++){
    checkRow(i);
    checkCol(i);
  }
  checkDiag();
  console.log("winner ="+winner);
  if(winner){
    if(winner === 'X'){
      alert("Red wins!");
      redWins++;
      return;
    }
    if(winner === 'O'){
      alert("Blue wins!");
      blueWins++;
      return;
    }
  }
}

/* event listeners */
$(document).ready(function() {

    $('#resetButton').click(function() {
        console.log("Reset button clicked.");
        for(var i = 0; i < 3; i++){
          for(var j = 0; j < 3; j++){
            board[i][j] = '';
            var rowstr = "row="+i;
            var colstr = "col="+j;
            var str = "[" + rowstr + "]" + "[" + colstr + "]";
            $(str).css("background-color", "#f1f1f1");
            winner = null;
            //console.log(i+","+j);
          }
        }
    });

    $('.square').click(function() {
      if(!winner){
        var row = $(this).attr('row');
        var col = $(this).attr('col');
        (turns % 2) ? placeX(row, col, $(this)) : placeO(row, col, $(this));
        //console.log(row + ", " + col + " clicked");
        if(!winner){
          (turns % 2) ? $('#turn').text("Red's turn!") : $('#turn').text("Blue's turn!");
        }
        if(winner){
          $('#redWins').text("Red's wins: "+redWins);
          $('#blueWins').text("Blue's wins: "+blueWins);
        }
      }
    });
});
