// Problem with bug jumping to 'Oops' after Enter for the sun
const correctAnswerImg = "https://upload.wikimedia.org/wikipedia/commons/b/b2/%D0%A1%D0%BC%D0%B0%D0%B9%D0%BB%D0%B8%D0%BA-%D0%A1%D0%BE%D0%BB%D0%BD%D1%86%D0%B5.jpg";
const wrongAnswerImg= "https://thumbs.dreamstime.com/b/sad-cloud-drops-rain-cute-light-blue-closed-eyes-43673958.jpg";
const noAnswerImg = "https://clip2art.com/images/homework-clipart-handwriting-19.jpg";


let questionCounter = 0;
let score = 0;

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-frame').hide();
  $('.feedback-section').hide();
  handleStart();
  handleSubmitAnswer();
  handlePopupClose();
  handleReset();
}

function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}

function renderQuestionCount(){ //Okay
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

function renderQuestion(){ //Okay
  $(".questions-form legend").text(questionsList[questionCounter].question);

  const options = [ 'optionone', 'optiontwo', 'optionthree','optionfour']
  for (let i=0; i< options.length; i++) {

    const optionName = options[i];

    $('#'+ optionName).next().text(questionsList[questionCounter][optionName]);
    $('#'+ optionName).val(questionsList[questionCounter][optionName]);

  }
}

function renderScore(){ 

var scoreText = `${score}/${questionsCount}`;

  $("span.bar-graph").text(scoreText);
}

function checkAnswer(selected){
  let rightAnswer = questionsList[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
   displayPopup(true, rightAnswer);
   $('.submit-btn').blur();
   $('.close-btn').focus();
  } 
  else{
   displayPopup(false, rightAnswer);
  //  $(".submit-btn".hide());
   $('.submit-btn').blur();
   $('.close-btn').focus();
  }
}

function displayPopup(statusFlag, answer){ //Check this
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-frame img").attr("src",correctAnswerImg);
    $(".popup-frame #popup-text").text("YES, Good job!");
    $(".popup-frame").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-frame img").attr("src",noAnswerImg);
         $(".popup-frame #popup-text").text('Oops, please select an option');
       }
      else{
         $(".popup-frame img").attr("src",wrongAnswerImg);
        $(".popup-frame #popup-text").text(`Sorry, the correct answer is: ${answer}`);
      }
    }
     $(".popup-frame").show();
}

function resetQuiz(){ //Okay
  questionCounter = 0;
  score = 0;
}

function displayFinalScore(){ //Okay
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

function handleStart(){ //Okay
	$('.js-start-btn').on('click',function(event){
		console.log("handleStart() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-frame').fadeIn("slow");
		renderQuizBox(); 
	});
}

function handleSubmitAnswer(){ //Check this section
  $('.js-submit-btn').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selected = $('input[type=radio]:checked').val();
      if(selected === undefined) {
        displayPopup(false, selected);
      }
      else{
        $('input[type=radio]:checked').attr('checked',false);
        checkAnswer(selected);
      }
 });
}

function handlePopupClose(){
  $('.js-close-btn').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-frame').hide();
    $('.feedback-section').hide();
    $('.quiz-frame').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsList.length) {
       $('.quiz-frame').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-frame').hide();
      displayFinalScore();
    }
  });
}

function handleReset(){ //Okay
  $('.js-reset-btn').on('click',function(event){
    console.log("handleReset() ran");
    $('.end-section').hide();
    $('.quiz-frame').fadeIn();
    renderQuizBox();
  });
}

let questionsList = [ //Okay
  {
    question: "Complete the following verse—John 3:16 (ESV) 'For God so loved the world, that he gave his only Son, that whoever believes in him should _____________.'",
     optionone: "Have eternal life and not perish",
    optiontwo: "Not perish but have eternal life",
    optionthree: "Lives a transformed life and hope for eternity",
    optionfour: "Loves him back",
    correctAnswer: "Not perish but have eternal life"
  },
  {
     question: "How many books are in the Old Testament and the New Testament?",
    optionone: "23,41",
    optiontwo: "41,23",
    optionthree: "27,39",
    optionfour: "39,27",
    correctAnswer: "39,27"
  
  },
  {
     question: "What are the 4 Gospels called?",
    optionone: "Adam, Eve, Abel, Cain",
    optiontwo: "Paul, Timothy, James, Peter",
    optionthree: "Mark, Matthew, Luke, John",
    optionfour: "Abraham, Moses, Saul, David",
    correctAnswer: "Mark, Matthew, Luke, John"
    
  },
    {
     question: "When did God rests after His creation account in the book of Genesis?",
    optionone: "Third day",
    optiontwo: "Sunday",
    optionthree: "Seventh day",
    optionfour: "He never rests",
    correctAnswer: "Seventh day"
    
  },
  {
    question: "What did God created man after?",
    optionone: "His image",
    optiontwo: "Spiritial beings",
    optionthree: "Perfection",
    optionfour: "Humanity",
    correctAnswer: "His image"
  },
  {
    question: "Who parted the Red Sea in the Exodus account?",
    optionone: "Noah",
    optiontwo: "Abraham",
    optionthree: "Joseph",
    optionfour: "Moses",
    correctAnswer: "Moses"
  },
  {
    question: "What is the great commission?",
    optionone: "Make me your Savior and Lord of all",
    optiontwo:  "Listen to my instructions and live accordingly",
    optionthree: "Pick up your cross daily and follow me",
    optionfour: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit",
    correctAnswer: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit"
  },
   {
    question: "What is the greatest commandment that Jesus mentioned of?",
    optionone: "Thou shall not sin",
    optiontwo: "You shall love your neighbor as yourself",
    optionthree: "You shall love the Lord your God with all your heart and with all your soul and with all your mind",
    optionfour:"You shall commit yourself to my laws and authority",
    correctAnswer: "You shall love the Lord your God with all your heart and with all your soul and with all your mind"
  },

  {
    question: "How many fruits of the Spirit are there?",
    optionone: "12",
    optiontwo: "7",
    optionthree: "15",
    optionfour:"3",
    correctAnswer: "12"
  },
  {
    question:"On what day did Jesus rise from the tomb?",
    optionone: "Third week after his burial",
    optiontwo: "Three hours after his burial",
    optionthree: "Three days after his burial",
    optionfour: "Seven days after his burial",
    correctAnswer: "Three days after his burial"
  }
  ];

let questionsCount = questionsList.length;

$(init());
