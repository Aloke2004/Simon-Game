let gameSeq = [];
let userSeq = [];
let scores = [];

let btns = ["yellow","red","green","purple"];

let started = false;
let level = 0;
let score = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let body = document.querySelector("body");
let highestScore = document.querySelector(".highest");

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
        console.log("Game is started");

        levelUp();       
    }
});

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },200);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random()*3);
    let ranColor = btns[ranIdx];
    let ranBttn = document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);
    console.log(gameSeq);

    gameFlash(ranBttn);

    h3.innerText = `Score = ${score}`;
    score++;

}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerText = `Game over!! Your score was ${score-1}\n Press any key to start......`;
        body.classList.add("gameOver");
        setTimeout(function(){
            body.classList.remove("gameOver");
        },200);
        scores.push(score-1);
        let highScore = Math.max(...scores);
        console.log(highScore);
        highestScore.innerText = `Highest score = ${highScore}`;
        reset();
        h3.innerText = `Score = ${score}`;
    }
}

function btnPressed(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}

function reset(){
    started=false;
    level=0;
    score=0;
    gameSeq=[];
    userSeq=[];
}