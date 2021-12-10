<?php

require __DIR__.'/../lib/functions.php';

// null合体演算子
// $id = ''
// if (isset($_GET['id']){
//     $id = $_GET['']
// }
$id = escape($_GET['id'] ?? '');

$data = fetchById($id);

if (!$data){
    error404();
}

$formattedData = generateFormattedData($data);


$assignData = [
    'id' => $formattedData['id'],
    'question' => $formattedData['question'],
    'answers' => $formattedData['answers']
];



loadTemplate('question',$assignData);

?>

