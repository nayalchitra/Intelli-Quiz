

const QUIZ_URL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple";

let quiz_data = []


const parentContainer = document.querySelector('.container');

let quizeIndex = 0;
let score = 0;
let selectedValue = "";
let optionsList= []

let guidelineList = [
    "There are total 10 questions in each category.",
    "you can attempt each question only once.",
    "Each question carries one mark. No negative marking for wrong answers.",
    "Question are Multiple Choice Questions.",
    "Don't plagarize. Try to answer on your own.",
    "You can take the quiz multiple times."
]

const getQuizData =async (URL)=>{
    try {
        const {data} = await axios.get(URL);
        const {results} = data;
        return results;
    } catch (error) {
            console.log(error);
    }
}

quiz_data = await getQuizData(QUIZ_URL);
console.log(quiz_data);


function question_option_record(quiz_data,quizeIndex){

   parentContainer.innerHTML = "";
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('options-container');
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('scores-container');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttons-container');


    const question = document.createElement('p');
    question.innerHTML = quiz_data[quizeIndex].question;
    questionContainer.appendChild(question);

    optionsList = [quiz_data[quizeIndex].correct_answer, ...quiz_data[quizeIndex].incorrect_answers].sort(()=>Math.random()-0.5);
    const scoreTitle = document.createElement('h4');
    scoreTitle.innerHTML = "Score";
    scoreTitle.classList.add('score-title');

    const scoreDisplay = document.createElement('h4');
    scoreDisplay.innerHTML = score;
    scoreDisplay.classList.add('score');


    scoreContainer.appendChild(scoreTitle);
    scoreContainer.appendChild(scoreDisplay);

   
    for(let option of optionsList){
        const btn = document.createElement('button');
        btn.innerHTML = option;
        optionContainer.appendChild(btn);
    }


    const quitBtn = document.createElement('button');
    quitBtn.classList.add('quit');
    quitBtn.innerHTML = "Quit";

    buttonContainer.appendChild(quitBtn);

    if(quizeIndex < quiz_data.length -1)
    {
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('next');
        nextBtn.innerHTML = "Next";
        buttonContainer.appendChild(nextBtn);
    }
    else{
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('submit');
        submitBtn.innerHTML = "Submit";
        buttonContainer.appendChild(submitBtn);
    }
   
    parentContainer.appendChild(scoreContainer);
    parentContainer.appendChild(questionContainer);
    parentContainer.appendChild(optionContainer);
    parentContainer.appendChild(buttonContainer);
}




const getGuideLines = ()=>{
    parentContainer.innerHTML = "";
    const title = document.createElement('h1');
    title.innerHTML = "Intelli Quiz"

    const container = document.createElement('div');
    container.classList.add('image-guideline');
    const quizImg = document.createElement('img');
    quizImg.setAttribute('src',"./asset/quiz-img.jpg");
    quizImg.style.height = "15rem";
    quizImg.style.borderRadius = "50%";
    
    const guidelineContainer = document.createElement('div');
    const guidelineHeading = document.createElement('h3');
    guidelineHeading.innerHTML = "Guidelines";
    guidelineHeading.style.textDecoration="underline";

    guidelineContainer.appendChild(guidelineHeading);

    const allGuidelines = document.createElement('ul');
    allGuidelines.classList.add('guideline-list-container');
    for(let guideline of guidelineList ){
        const li = document.createElement('li');
        li.innerHTML = guideline;
        allGuidelines.appendChild(li);
    }

    guidelineContainer.appendChild(allGuidelines);

    const startBtn = document.createElement('button');
    startBtn.innerHTML = "Let's the game begin ♥️🔥";
    startBtn.classList.add('game-start');

    container.appendChild(quizImg);
    container.appendChild(guidelineContainer);

    parentContainer.appendChild(title);
    parentContainer.appendChild(container);
    parentContainer.appendChild(startBtn);


}




const disableOptions = ()=>{
  
    
    document.querySelectorAll('.options-container button').forEach((elem)=>elem.setAttribute('disabled',true));
    
   
}




getGuideLines();

setTimeout(()=>{
    let startBtn = document.querySelector('.game-start');
    console.log(startBtn);
    
    if(startBtn){
        startBtn.addEventListener('click', ()=>{
            question_option_record(quiz_data,quizeIndex);
            
        })
    }

},1000);


parentContainer.addEventListener('click', (e)=>{
   
    let className = e.target.className;
    const elem = e.target;
    if(className == "next"){
        quizeIndex++;
        question_option_record(quiz_data,quizeIndex);
        
    }
    else if(className == "quit"){
        parentContainer.innerHTML = "";
        getGuideLines();
    }
    else if(className == "submit"){
        console.log("submit")
        parentContainer.innerHTML = "";
        parentContainer.innerHTML = `Your score is ${score}`;
    }
    else if(e.target.parentNode?.className === "options-container"){
        selectedValue = e.target.innerText;
        console.log(selectedValue);

        if(selectedValue == quiz_data[quizeIndex].correct_answer){
            score++;
            e.target.classList.add('correct-answer');
            
        }
        else{
            e.target.classList.add('incorrect-answer');
           
        }
        disableOptions();
    }
})
