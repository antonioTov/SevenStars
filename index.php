<?
if(!isset($_GET['f']))
    $file = 'index';
else
    $file = $_GET['f'];
   
if(!file_exists("templates/$file.html"))
{
    echo "<h1>Страница не найдена!</h1>";
    exit;
}
else
    require("templates/main.html");
?>
as
