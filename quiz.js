// create quiz

const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton = document.getElementById('submit');

const quizQuestions = [
  {
    question: "What area is Lluka's PhD in?",
    answers: {
      a: "Geology",
      b: "Evolutionary biology",
      c: "Palaeontology",
      d: "Ecology"
    },
    correctAnswer: "a"
  },
  {
    question: "What is Lluka's favourite genre of weird rocks?",
    answers: {
      a: "Rare metal pegmatites",
      b: "Ultra-mafic systems",
      c: "Alkaline-silicate systems and carbonatites",
      d: "Sedimentary basins"
    },
    correctAnswer: "c"
  },
  {
    question: "Which project has not been a topic of Lluka's research?",
    answers: {
      a: "Nb-Ta mineralisation of the Mt Weld Carbonatite",
      b: "Sedimentology and stratigraphy of ex-cave deposits on Barrow Island",
      c: "Mineralogy and geochemistry of the enigmatitic nundorite",
      d: "Mineralogy and organic geochemistry of Lashmars Lagoon"
    },
    correctAnswer: "b"
  },
  {
    question: "What is Lluka holding in the photo of them in the field?",
    answers: {
      a: "A rock",
      b: "A big sandwich",
      c: "A water bottle",
      d: "A rock hammer"
    },
    correctAnswer: "d"
  }
];

function buildQuiz(){
    const output = [];

  for (i = 0; i < quizQuestions.length; i++) {
    const answers = [];

    for (letter in quizQuestions[i].answers) {
      answers.push(
        '<label>'
        + '<input type="radio" name="question' + i + '" value="' + letter + '">'
        + letter + ': '
        + quizQuestions[i].answers[letter]
        + '</label>'
      );
    }

    output.push(
      '<div class="question">' + quizQuestions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
    );
  }

  quizContainer.innerHTML = output.join('');
}

// gather answer containers from our quiz
function showResults() {
  var answerContainers = quizContainer.querySelectorAll('.answers');
// keep track of user's answers  
   var numCorrect = 0; 
// for each question...
    for (i = 0; i < quizQuestions.length; i++) {
// find selected answer
     userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value; // if answer is correct
     if (userAnswer === quizQuestions[i].correctAnswer) {
      numCorrect++;
// color the answers green
       answerContainers[i].style.color = 'lightgreen';
     } else {
// color the answers red
       answerContainers[i].style.color = 'red';
    }
  }

  if (numCorrect === 0) {
    resultsContainer.innerHTML = "I don't think you paid attention — you didn’t get a single answer correct.";
  }
  if (numCorrect === 1) {
    resultsContainer.innerHTML = "Try again! You only got one correct answer.";
  }
  if (numCorrect === 2) {
    resultsContainer.innerHTML = "50 % is technically a pass. Have another go to improve.";
  }
  if (numCorrect === 3) {
    resultsContainer.innerHTML = "Nice work! 3 out of 4 is pretty good.";
  }
  if (numCorrect === 4) {
    resultsContainer.innerHTML = "Congratulations! Perfect score!";
  }
}




buildQuiz();

submitButton.onclick = function () {
  showResults();
};