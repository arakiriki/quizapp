const answersList = document.querySelectorAll('ol.answers li');

answersList.forEach(li => li.addEventListener('click',checkClickedAnswer));



function checkClickedAnswer(event){

    // クリックされた答えの要素(liタグ)
    const clickAnswerElement = event.currentTarget;

    // 選択した答え(A,B,C,D)
    const selectedAnswer = clickAnswerElement.dataset.answer;
    // 正しい答え(A,B,C,D)  
    const questionId = clickAnswerElement.closest('ol.answers').dataset.id;


    //フォームデータの入れ物を作る
    const formData = new FormData();

    //送信したい値を追加
    formData.append('id', questionId);
    formData.append('selectedAnswer', selectedAnswer);

    // xhr = XMLHttpRequestの頭文字
    const xhr = new XMLHttpRequest();

    //HTTPメソッドをPOSTに指定、送信するURLを指定
    xhr.open('POST', 'answer.php');

    //フォームデータを送信
    xhr.send(formData);

    //loadendはリクエストが完了したときに発生するイベント
    xhr.addEventListener('loadend', function(event){
        /** @type {XMLHttpRequest} */
        const xhr = event.currentTarget;
        
        //リクエストが成功したかステータスコードで確認
        if (xhr.status === 200){
            const response = JSON.parse(xhr.response);

            // 答えが正しいか判定
            const result = response.result;
            const correctAnswer = response.correctAnswer;
            const correctAnswerValue = response.correctAnswerValue;
            const explanation = response.explanation;

            //画面を表示
            displayResult(result,correctAnswer, correctAnswerValue, explanation);

        }else{
            //エラー
            alert('ERROR: 解答データの取得に失敗しました。');
        }
    });



}




function displayResult(result,correctAnswer, correctAnswerValue, explanation){
    // メッセージを入れる変数を用意
    let message;
    // カラーコードを入れる変数を用意
    let answerColorCode;

    if(result){
        // 正解の場合の処理
        message = "おめでとう！正解です！"
        answerColorCode = '';
    } else{
        // 不正解の場合の処理
        message = "残念！不正解です！"
        answerColorCode = '#f05959';

    }

    alert(message);

    //正解の内容をHTMLに組み込む
    document.querySelector('span#correct-answer').innerHTML = correctAnswer + '. ' +correctAnswerValue ;
    document.querySelector('span#explanation').innerHTML = explanation;

    // 色を変更(間違った時だけ色が変わる)
    document.querySelector('span#correct-answer').style.color = answerColorCode;
    // 答え全体を表示
    document.querySelector('div#section-correct-answer').style.display = 'block';
}