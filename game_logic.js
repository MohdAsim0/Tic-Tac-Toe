let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

//color for highlighting winning blocks
let winnerIndicator=getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// console.log(boxes);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer=X_TEXT;//play starts with X
let spaces=Array(9).fill(null); //array with null 
let count_chaal=0;//to check no. of plays 

// console.log(spaces);

const startgame = () => {
  boxes.forEach((box) => {
    box.addEventListener('click', boxClicked);
  });
};


function boxClicked(e){
   const id=e.target.id;//getting id of each box which was provided in html 
   
  //  if spaces[0-9] is false i.e spaces array is not null&& chaal should be  0---8
   if(!spaces[id]&&count_chaal<9){
    spaces[id]=currentPlayer;
    e.target.innerText=currentPlayer;

    if (playerHasWon()!=false){
      //if playerHasWon fun return true then change the html of class playerText
    playerText.innerHTML=`${currentPlayer} has won!`
     let winning_blocks=playerHasWon();
     count_chaal=10;
    //  console.log(winning_blocks);
    //highlighting winning block
    winning_blocks.map(box=>boxes[box].style.backgroundColor=winnerIndicator)
    return;
    }
    count_chaal++;
    currentPlayer=currentPlayer==X_TEXT?O_TEXT:X_TEXT;
   }

   if (count_chaal===9) {
      playerText.innerHTML=`Match Tied`
      boxes.map((box)=>{
        box.style.color='red';
      })
   }
}

//winning combination in array
const winningCombos=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [2,5,8],
  [1,4,7],
  [0,4,8],
  [2,4,6]
]

function playerHasWon(){
  for (const wincombo of winningCombos) {
    let[a,b,c]=wincombo;

    //if winningCombos all three indices are equal means player won
    if (spaces[a]&&(spaces[a]==spaces[b]&&spaces[a]==spaces[c])) {
      //return [a,b,c]
      return [a,b,c];
    }
  
  }
return false;
}

restartBtn.addEventListener('click',restart);
   function restart(){
    spaces.fill(null);
    count_chaal=0;
    boxes.forEach((box)=>{
      box.innerText=""
      box.style.backgroundColor=""
      box.style.color='#1ba7ca'
   })

   playerText.innerHTML = 'Tic Tac Toe'
   currentPlayer = X_TEXT
   }


startgame();