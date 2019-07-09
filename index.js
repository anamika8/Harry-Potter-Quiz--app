'use strict';

let questionNumber = 1;

let rightAns = '';

let numCorrectedAnswer = 0;

const quizQuestions = [
  {
    number: 1,
    text: `Who is the Author of Harry Potter story?`,
    ans1: `J.K.Rowling`,
    ans2: `Dan Brown`,
    ans3: `Salman Rushdie`,
    ans4: `John Grisham`,
    correctAns: `J.K.Rowling`
  },

  {
    number: 2,
    text: `What is Harry Potter mother's name?`,
    ans1: `Lily Evans Potter`,
    ans2: `Molly Weasley`,
    ans3: `Nymphadora Tonks`,
    ans4: `Dolores Umbridge`,
    correctAns: `Lily Evans Potter`
  },

  {
    number: 3,
    text: `How many broomsticks are flown in a full game of Quidditch?`,
    ans1: `One hundred eight`,
    ans2: `Fourteen`,
    ans3: `Sixteen`,
    ans4: `Fifteen`,
    correctAns: `Fifteen`
  },
  {
    number: 4,
    text: `What is the name of Harry Potter's first book?`,
    ans1: `Harry Potter and the Prisoner of Azkaban`,
    ans2: `Harry Potter and The Philosopher's Stone`,
    ans3: `Harry Potter and the Order of the Phoenix`,
    ans4: `Harry Potter and the Chamber of Secrets`,
    correctAns: `Harry Potter and The Philosopher's Stone`
  },
  {
    number: 5,
    text: `Who is Harry Potter's best friend ?`,
    ans1: `Ron Weasley`,
    ans2: `Hermione Granger`,
    ans3: `Rubeus Hagrid.`,
    ans4: `Luna Lovegood`,
    correctAns: `Ron Weasley`
  }
];


function handleStartButton() {
  $('#js-start-button').on('click', function (event) {
    $('.hidden-js-container').find('.firstPage').addClass('hidden');
    changeBackgroundImage();
    loadQuestions(questionNumber);
  });
}


function handleSubmitButton() {
  $('.hidden-js-container').on('click', '#js-submit-button', function (event) {
    event.preventDefault();
    userSelectedAns();
  });
}

function handleNextButton() {
  $('.hidden-js-container').on('click', '#js-next-button', function (event) {
    event.preventDefault();
    loadQuestions(++questionNumber);

  });
}

function handleRestartButton() {
  $('.hidden-js-container').on('click', '#js-restart-button', function (event) {
    event.preventDefault();
    questionNumber = 1;
    numCorrectedAnswer = 0;
    loadQuestions(questionNumber);

  });
}

function handleResetButton() {
  $('.hidden-js-container').on('click', '#js-reset-button', function (event) {
    event.preventDefault();
    location.reload();

  });
}

function changeBackgroundImage() {
  $("html").css("background-image", "url('https://vignette.wikia.nocookie.net/harrypotter/images/9/91/Death_Chamber_1.jpg/revision/latest?cb=20090327234039')");

}


function handleUserAnswers() {

  $('.hidden-js-container').on('click', "input[name='option']", function (event) {
    let selectedAnswer = $("input[name='option']:checked").val();
    if (selectedAnswer != '') {
      $('#js-submit-button').prop('disabled', false);
      $('.hidden-js-container').find('#js-submit-button').removeClass('buttonDisabled');
    }
  });

}

/**
 * Loads the question set by set number
 */
function loadQuestionSet(questionNum) {
  if (questionNum <= quizQuestions.length) {
    let i = questionNum - 1;
    let question = quizQuestions[i].text;

    let answer1 = quizQuestions[i].ans1;
    let answer2 = quizQuestions[i].ans2;
    let answer3 = quizQuestions[i].ans3;
    let answer4 = quizQuestions[i].ans4;

    rightAns = quizQuestions[i].correctAns;

    return `  
        <section id ="questionSet">
                <form>
                  <fieldset>
                  <legend class="question">${question}</legend>

                  <div id="quizOptions"> 
                    <input type="radio" name="option" id="answer-1" value="${answer1}">
                    <label for="answer-1">${answer1}</label>
                    <br>
                    <input type="radio" name="option" id="answer-2" value="${answer2}">
                    <label for="answer-2">${answer2}</label>
                    <br>
                    <input type="radio" name="option" id="answer-3" value="${answer3}">
                    <label for="answer-3">${answer3}</label>
                    <br>
                    <input type="radio" name="option" id="answer-4" value="${answer4}">
                    <label for="answer-4">${answer4}</label>
                  </div>    
                  </fieldset>
                
                   <button id="js-submit-button" disabled="disabled" class="buttonDisabled">SUBMIT</button>
                   <button id="js-restart-button">RESTART</button>
                </form>

        <footer role="contentinfo" class="footer">
            <span id="questionCount">QUESTION: ${questionNumber}/${quizQuestions.length}</span>
            <span id="scoreValue">SCORE: ${numCorrectedAnswer}</span>
        </footer>
      </section>       
     `;

  } else {
    showFinalResult();
  }


}

function loadQuestions(questionNum) {
  $('.hidden-js-container').html(loadQuestionSet(questionNum));
}

function userSelectedAns() {
  let radioValue = $("input[name='option']:checked").val();
  if (radioValue == rightAns) {
    numCorrectedAnswer += 1;
    handleCorrectAnswer();
  }

  else {
    handleWrongAnswer();
  }
}

function handleCorrectAnswer() {
  let correctAnsMessage = `
        <section class="correctMessage">
          <h2>The answer is correct!</h2>
          <img src="rightAnsPic.gif" alt="Happy Harry Potter">
          <button id="js-next-button">NEXT</button>
        </section>
      `;
  $(".hidden-js-container").html(correctAnsMessage);
}

function handleWrongAnswer() {
  let wrongAnsMessage = `
       <section class="wrongMessage">
         <h2>Wrong Answer ! It should be ${rightAns} !</h2>
         <img src="wrongAnsPic.gif" alt="Sad Harry Potter">
         <button id="js-next-button">NEXT</button>
      </section>
    `;
  $(".hidden-js-container").html(wrongAnsMessage);
}

function showFinalResult() {
  let finalMessage = `
    <section id="finalResult">
      <h2>Final Score: ${numCorrectedAnswer} out of ${quizQuestions.length}</h2>
      <button id="js-reset-button">PLAY AGAIN?</button>
    </section>
   `;
  $('#heading').addClass('hidden');
  $(".hidden-js-container").html(finalMessage);
}

function handleQuizApp() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
  handleResetButton();
  handleUserAnswers();
}

// when the page loads, call `handleQuizApp`
$(handleQuizApp);

