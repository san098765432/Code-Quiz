
const start_game = document.querySelector(".start_game button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .end_game");
const continue_btn = info_box.querySelector(".buttons .continue");
const questions_box = document.querySelector(".questions_box");
const timeCount = questions_box.querySelector(".timer .seconds");
const timeLine = questions_box.querySelector("header .time_line");


const possible_answers = document.querySelector(".possible_answers");

 start_game.onclick = ()=>{
     info_box.classList.add("activeInfo");
 }


 exit_btn.onclick = ()=>{
     info_box.classList.remove("activeInfo"); 
 }


 continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    questions_box.classList.add("activeQuiz"); 
    showQuestions(0);
    queCounter(1);
    startTimer(20)
    startTimerLine(0);
}

let counterLine;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let timeValue = 20;
let widthValue = 0;
let counter;


const next_question = questions_box.querySelector(".next_question");
const score = document.querySelector(".score");
const continue_game = score.querySelector(".buttons .continue");
const end_game_quiz = score.querySelector(".buttons .end_game");



continue_game.onclick = ()=>{
   questions_box.classList.add("activeQuiz");
   score.classList.remove("activeResult");
   let que_count = 0;
   let que_numb = 1;
   let timeValue = 20;
   let widthValue = 0;
   let userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  next_question.style.display = "none";
}

end_game_quiz.onclick = ()=>{
    window.location.reload();
}


next_question.onclick = ()=>{
   if(que_count < questions.length -1){
       que_count++;
       que_numb++;
       showQuestions(que_count);
       queCounter(que_numb);
       clearInterval(counter);
       startTimer(timeValue);
       clearInterval(counterLine);
       startTimerLine(widthValue);
       next_question.style.display = "none";
   }else{
       console.log("Questions completed");
       showResultBox();
   }
}




function showQuestions(index){
    const question = document.querySelector(".question");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<nav class= "option">'+ questions[index].options[0] +'<span></span></nav>'
                      + '<nav class= "option">'+ questions[index].options[1] +'<span></span></nav>'
                      + '<nav class= "option">'+ questions[index].options[2] +'<span></span></nav>'
                      + '<nav class= "option">'+ questions[index].options[3] +'<span></span></nav>';

    question.innerHTML = que_tag; 
    possible_answers.innerHTML = option_tag; 
    const option = possible_answers.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}   

let tickIcon = '<nav class="icon tick"><i class="fas fa-check"></i></nav>';
let crossIcon = '<nav class="icon cross"><i class="fas fa-times"></i></nav>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let rightAnswers = questions[que_count].answer;
    let allOptions = possible_answers.children.length;
    if(userAns == rightAnswers){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Correct Answer!");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Wrong Answer!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

   
        for (let i = 0; i < allOptions; i++){
        if(possible_answers.children[i].textContent == rightAnswers){
            possible_answers.children[i].setAttribute("class", "option correct");
            possible_answers.children[i].insertAdjacentHTML("beforeend", tickIcon);
           }
       }
    }

  
    for (let i =0; i < allOptions; i++) {
        possible_answers.children[i].classList.add("disabled");
    }
    next_question.style.display = "block";
}


function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    questions_box.classList.remove("activeQuiz"); //hide the quiz box
    score.classList.add("activeResult"); //show the result box
    const scoreText = score.querySelector(".total_mark");
    if(userScore > 3){
        let scoreTag = '<span> Congrats, you scored <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span> Great effort! you scored <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span> You scored <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            

            let rightAnswers = questions[que_count].answer;
            let allOptions = possible_answers.children.length;

            for (let i = 0; i < allOptions; i++){
                if(possible_answers.children[i].textContent == rightAnswers){
                    possible_answers.children[i].setAttribute("class", "option correct");
                    possible_answers.children[i].insertAdjacentHTML("beforeend", tickIcon);
                   }
               }
               for (let i =0; i < allOptions; i++) {
                possible_answers.children[i].classList.add("disabled");
            }
            next_question.style.display = "block";
        }

    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }

    }
}



function queCounter(index){
    const bottom_ques_counter = questions_box.querySelector(".correct_answers");
    let totalQuesCountTag = '<span><p>'+ index +'</p>Of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}



function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();










