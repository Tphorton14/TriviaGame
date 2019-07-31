


$(document).ready(function() {
  
    $("#time-remain").hide();
    $("#start").on("click", myQuestions.beginGame);
    $(document).on("click", '#options', myQuestions.guessChecker);
    
  });







let myQuestions = {

    correctAnswer: 0,
    incorrectAnswer: 0,
    unanswered: 0,
    currentSet: 0,
    time: 20,
    timeOn: false,
    timerId: "",

    questions : {
        q1: "Name the largest freshwater lake in the world?",
        q2: "What is the diameter of Earth?", 
        q3: "Which garden is considered to be among the Seven Wonders of the Ancient World?",
        q4: "In 2011, which country hosted a Formula 1 race for the first time?",
        q5: "In what three cities did the Braves win the 1914, 1957, and 1995 World Series?",
        q6: "Who was Dan Reeves successor as head coach after Reeves was fired with a few games left in 2003?",
        q7: "What number did Atlanta United retire for the fans?", 
        q8: "What is my favorite number?",
    },

    choice : {
        q1: ["Lake Lanier", "Lake Taho", "Lake Superior", "Lake Okeechobee"],
        q2: ["8,000 Miles", "11,275 Miles", "6,898 Miles", "11,111 Miles"],
        q3: ["Spring Gardens Keukenhof", "Gardens of Versailles", "The Hanging Gardens of Babylon", "Royal Botanic Gardens at Kew"],
        q4: ["Chile", "Poland", "England", "India"],
        q5: ["Chicago, Boston, Atlanta", "Boston, Atlanta, Milwaukee" ,"Milwaukee, Atlanta, Brooklyn", "Atlanta, San Francisco, Cleveland"],
        q6: ["Wade Phillips", "Bobby Petrino", "Mike Smith", "Jim L. Mora"],
        q7: ["1", "17", "7", "18"],
        q8: ["8", "7", "24", "16"]
    },

    rightAnswer : {
        q1: "Lake Superior",
        q2: "8,000 Miles",
        q3: "The Hanging Gardens of Babylon",
        q4: "India",
        q5: "Boston, Atlanta, Milwaukee",
        q6: "Wade Phillips",
        q7: "17",
        q8: "8"
    },



beginGame : function() {

    clearInterval(myQuestions.timerId);
    $("#game").show();
    $("#result").html("");
    $("#clock").text(myQuestions.time);
    $("#start").hide();
    $("#time-remain").show();
    myQuestions.nextQ();
},

nextQ : function () {

    myQuestions.time = 20;
    $("#clock").text(myQuestions.time);
    $("#clock").text(myQuestions.time);
    
    if(!myQuestions.timeOn){
        myQuestions.timerId = setInterval(myQuestions.timer, 1000);
      }

    
    let questionContent = Object.values(myQuestions.questions)[myQuestions.currentSet];
    $("#question").text(questionContent);
    
   
    let questionOptions = Object.values(myQuestions.choice)[myQuestions.currentSet];
    
   
    $.each(questionOptions, function(index, key){
      $("#options").append($("<button class='choose btn btn-info btn-lg'>"+ key +"</button>"));
    })
    
  },
 
  timer : function(){
    
    if(myQuestions.time > -1 && myQuestions.currentSet < Object.keys(myQuestions.choice).length){
      $("#clock").text(myQuestions.time);
      myQuestions.time--;
        if(myQuestions.time === 4){
          $("#clock").addClass('last-seconds');
        }
    }
    
    else if(myQuestions.time === -1){
      myQuestions.unanswered++;
      myQuestions.result = false;
      clearInterval(myQuestions.timerId);
      resultId = setTimeout(myQuestions.guessResult, 1000);
      $("#result").html("Out of time! The answer was "+ Object.values(myQuestions.rightAnswer)[myQuestions.currentSet]);
    }
   
    else if(myQuestions.currentSet === Object.keys(myQuestions.questions).length){
      
      
      $("#result")
        .html("Thanks For Playing!" +
        '<p>Correct: '+ myQuestions.correctAnswer +'</p>'+
        '<p>Incorrect: '+ myQuestions.incorrectAnswer +'</p>'+
        '<p>Unaswered: '+ myQuestions.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      
      $('#game').hide();
      
      
      $('#start').show();
    }
    
  },
  
  guessChecker : function() {
    
    let resultId;
    let currentAnswer = Object.values(myQuestions.rightAnswer)[myQuestions.currentSet];
    
    if($(this).on("click") === currentAnswer){
      
      myQuestions.correctAnswer++;
      clearInterval(myQuestions.timerId);
      resultId = setTimeout(myQuestions.guessResult, 1000);
      $("#result").text("Correct!");
    }
    else{
     
      
      myQuestions.incorrectAnswer++;
      clearInterval(myQuestions.timerId);
      resultId = setTimeout(myQuestions.guessResult, 1000);
      $("#result").text("Wrong! The Correct Answer is: "+ currentAnswer);
    }
    
  },

  result : function(){
    
    myQuestions.currentSet++;
    
    $("#options").remove();
    $("#result").remove();
    
    // begin next question
    myQuestions.nextQ();
     
  }

}
