<?php
function ShowCollection ($collection)
{
    $list = "<ul>";
    foreach ($collection as $key => $value)
    {
        $list .= "<li> $key : $value </li>";
    }
    $list .= "</ul>";
    
    return $list;
}

function MakeArray($quantity)
{
    $stars = array();
    for($i = 0; $i < $quantity; ++$i)
        $stars[] = "*";
    return $stars;
}
?>
