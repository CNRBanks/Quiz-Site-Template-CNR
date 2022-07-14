//getting all required elements
const start_button = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quizbox = document.querySelector(".quizbox");
const timeCount = quizbox.querySelector(".timer .time_sec")
const timeLine = quizbox.querySelector("header .time_line")


const option_list = document.querySelector(".option_list");


//if start quiz button clicked
start_button.onclick = () => {
    info_box.classList.add("activeInfo"); // show the information box
}

// //if exit button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the information box
}

// //If continue button is clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the information box
    quizbox.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

// links next button with HTML
const next_btn = quizbox.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// allows user to exit quiz when clicking restart button
restart_quiz.onclick = ()=>{
    quizbox.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
}

// allows user to exit quiz when clicking quit button
quit_quiz.onclick = ()=>{
    window.location.reload();
}

// If next button is clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    } else {
        console.log("Questions completed")
        showResultBox()
    }
}

// getitng questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option")
    for (let index = 0; index < option.length; index++) {
        option[index].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    startTimer(timeValue);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct!");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // if answer is correct then automatically select the correct answer
        for (let index = 0; index < allOptions; index++) {
            if (option_list.children[index].textContent == correctAns) {
                option_list.children[index].setAttribute("class", "option correct");
                option_list.children[index].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    // once user selected disabled all options
    for (let index = 0; index < allOptions; index++) {
        option_list.children[index].classList.add("disabled");
    }
    next_btn.style.display = "block";
}



function showResultBox(){
    info_box.classList.remove("activeInfo"); // hide the information box
    quizbox.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>Awesome, it looks like you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 3){
        let scoreTag = '<span>Nice, it looks like you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 3){
        let scoreTag = '<span>Dang, it looks like you only got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let index = 0; index < allOptions; index++) {
                if (option_list.children[index].textContent == correctAns) {
                    option_list.children[index].setAttribute("class", "option correct");
                    option_list.children[index].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let index = 0; index < allOptions; index++) {
                option_list.children[index].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }

}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }

}


function queCounter(index) {
    const bottom_ques_counter = quizbox.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}