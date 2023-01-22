// An array of questions to ask the user.
let questions = questionsArray;
// console.log(questions);


// set the time for the quiz
let time = 120;
// This is creating a variable called timer and assigning it to the element with the id of time.
let timer = document.getElementById("time");
// Creating a variable called interval.
let interval;

// Creating a variable called userAnswer.
let userAnswer;
/* Creating a variable called correctAnswer. */
let correctAnswer;



//  The startTimer function sets an interval that will run every second, and will decrement the time
//  variable by 1, and will update the timer element with the new time. If the time reaches 0 or the
//  currentQuestionIndex reaches the length of the questions array, the interval will be cleared and the
//  endQuiz function will be called
function startTimer() {
    interval = setInterval(function() {
        time--;
        timer.innerHTML = time;
        if (time === 0 || currentQuestionIndex === questions.length) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}



// When the function is called, the score variable is increased by 10 and the score element is updated
// to reflect the new score.
let score = 0;
function updateScore() {
    score += 10;
    document.getElementById("score").innerHTML = score;
}


// The updateTime function subtracts 10 from the time variable.
function updateTime() {
    time -= 10;
}



// This is creating a variable called startButton and assigning it to the element with the id of start.
let startButton = document.getElementById("start");
// This is creating a variable called startScreen and assigning it to the element with the id of
// start-screen.
let startScreen = document.getElementById("start-screen");
// This is creating a variable called questionScreen and assigning it to the element with the id of
// questions.
let questionScreen = document.getElementById("questions");

// This is creating a variable called startButton and assigning it to the element with the id of start.
// This is creating a variable called startScreen and assigning it to the element with the id of
// start-screen.
// This is creating a variable called questionScreen and assigning it to the element with the id of
// questions.
startButton.addEventListener("click", function() {
    startTimer();
  startScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  showQuestion();
});

// This is creating a variable called questionTitle and assigning it to the element with the id of
// question-title.
let questionTitle = document.getElementById("question-title");
// This is creating a variable called questionChoices and assigning it to the element with the id of
// choices.
let questionChoices = document.getElementById("choices");



let currentQuestionIndex = 0;


//  The showQuestion function displays the question and choices to the user, and then checks if the
//  user's answer is correct or incorrect
//  @returns the user's answer and the correct answer.
function showQuestion() {
    if(currentQuestionIndex === questions.length) {
        endQuiz();
        return;
    }    
    questionTitle.innerHTML = questions[currentQuestionIndex].question;
    questionChoices.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach(function(choice) {
        let choiceButton = document.createElement("button");
        choiceButton.classList.add("choice-btn", "btn", "btn-primary");
        choiceButton.innerHTML = choice;
        questionChoices.appendChild(choiceButton);
        userAnswer = choice;
        correctAnswer = questions[currentQuestionIndex].answer;
        choiceButton.addEventListener("click", function() {
            userAnswer = this.innerHTML;
            correctAnswer = questions[currentQuestionIndex].answer;

            let feedback = document.getElementById("feedback");
            // Get the audio elements
            let correctSound = document.getElementById("correctSound");
            let incorrectSound = document.getElementById("incorrectSound");
            // This is a function that is being called after the user clicks on an answer. It is
            // clearing the feedback, hiding the feedback, clearing the question choices, incrementing
            // the current question index, and then calling the showQuestion function. 
            if (userAnswer === correctAnswer) {
                updateScore();
                feedback.innerHTML = "Correct!";
                feedback.classList.remove("hide", "incorrect");
                feedback.classList.add("correct");
                time += 10; // Add time if the answer is correct
                timer.innerHTML = time;
                correctSound.play();
            } else {
                // This is a function that is being called after the user clicks on an answer. It is
                // clearing the feedback, hiding the feedback, clearing the question
                // choices, incrementing the current question index, and then calling the showQuestion function.
                updateTime();
                feedback.innerHTML = "Incorrect!";
                feedback.classList.remove("hide", "correct");
                feedback.classList.add("incorrect");
                incorrectSound.play();
            }
            // This is a function that is being called after the user clicks on an answer. It is
            // clearing the feedback, hiding the feedback, clearing the question choices, incrementing
            // the current question index, and then calling the showQuestion function.
            setTimeout(function() {
                feedback.innerHTML = "";
                feedback.classList.add("hide");
                questionChoices.innerHTML = "";
                currentQuestionIndex++;
                showQuestion();
            }, 500);
        });
    });
}


//  If the time is up or the current question index is equal to the length of the questions array, then
//  set the time to 0, clear the interval, display the final score, add a 2 second delay before showing
//  the end screen, and add an event listener to the submit button that stores the initials and score in
//  local storage and redirects to the high scores page.
function endQuiz() { 
    // This is a function that is being called after the user clicks on an answer. It is clearing
    // the feedback, hiding the feedback, clearing the question choices, incrementing the current question index, and then calling the showQuestion function.
    if (time <= 0 || currentQuestionIndex === questions.length) {
        time = 0;
        timer.innerHTML = time;

        clearInterval(interval);
        let finalScore = document.getElementById("final-score");
        finalScore.innerHTML = score;
        questionScreen.classList.add("hide");

        // Add a 2 second delay before showing the end screen
        // This is a function that is being called after the user clicks on an answer. It is clearing
        // the feedback, hiding the feedback, clearing the question choices, incrementing the current
        // question index, and then calling the showQuestion function. 
        setTimeout(function() {
            let form = document.getElementById("end-screen");
            form.classList.remove("hide");
            let submit = document.getElementById("submit");
            submit.addEventListener("click", function() {
                let initials = document.getElementById("initials").value;
                if(localStorage){
                    localStorage.setItem(initials, score);
                }
                // Redirect to the high scores page
                window.location.href = "highscores.html";
            });
        }, 2000);
    }
}









