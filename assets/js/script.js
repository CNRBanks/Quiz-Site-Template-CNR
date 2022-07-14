//getting all required elements
const start_button = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quizbox = document.querySelector(".quizbox")

// const el = document.getElementsByClassName('start_button');
// console.log(el);

//if start button clicked
start_button.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the information box
}

// //if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // hide the information box
}

// //If continue button is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // hide the information box
    quizbox.classList.add("activeQuiz"); // show the quiz box
}



// quit = quit
// restart = continue

// buttons = navigation buttons