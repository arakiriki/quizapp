const answersList = document.querySelectorAll('ol.answers li');

answersList.forEach(li => li.addEventListener('click',checkClickedAnswer));



// 正しい答え
const correctAnswers = {
    1:'B',
    2:'A',
    3:'B'
};


function checkClickedAnswer(event){

    // クリックされた答えの要素(liタグ)
    const clickAnswerElement = event.currentTarget;

    // 選択した答え(A,B,C,D)
    const selectedAnswer = clickAnswerElement.dataset.answer;
    // 正しい答え(A,B,C,D)  
    const questionId = clickAnswerElement.closest('ol.answers').dataset.id;

    const correctAnswer = correctAnswers[questionId];

    // メッセージを入れる変数を用意
    let message;
    // カラーコードを入れる変数を用意
    let answerColorCode;

    if(selectedAnswer === correctAnswer){
        // 正解の場合の処理
        message = "おめでとう！正解です！"
        answerColorCode = '';
    } else{
        // 不正解の場合の処理
        message = "残念！不正解です！"
        answerColorCode = '#f05959';

    }



    alert(message);

    // 色を変更(間違った時だけ色が変わる)
    document.querySelector('span#correct-answer').style.color = answerColorCode;
    // 答え全体を表示
    document.querySelector('div#section-correct-answer').style.display = 'block';
};