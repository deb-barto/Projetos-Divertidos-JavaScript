// initial data
let currentQuestion = 0;
let correctAnswers = 0;

//Functions
showQuestion();

//events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml= '';
        for (let i in  q.options){
            optionsHtml += `<div data-op="${i}" class=option><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach (item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else{
        finishQuizz();
    }
}

function optionClickEvent(e){
    let clickedOption =parseInt( e.target.getAttribute('data-op'));

    if (questions [currentQuestion].answer === clickedOption){
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuizz(){
    
    let points =Math.floor((correctAnswers / questions.length)*100);

    if(points<40){
        document.querySelector('.scoreText1').innerHTML = 'Não foi fácil...';
        document.querySelector('.scorePct').style.color = '#ff00000';

    } else if( points >=40 && points<70 ){
        document.querySelector('.scoreText1').innerHTML = 'Até que ta bom';
        document.querySelector('.scorePct').style.color = '#ffb600';
    } else if( points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns! Você manja.';
        document.querySelector('.scorePct').style.color = '#00ff00';
    }


    document.querySelector('.scorePct').innerHTML = ` Acertou ${points}%` ;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}` ;
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;

}

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion()
}