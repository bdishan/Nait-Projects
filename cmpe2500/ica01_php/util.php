<?php
    
    function GenerateNumbers(){
        $nums = array();
        for ($i=1; $i <= 10; $i++) { 
            array_push($nums,$i);
        } 
        
        shuffle($nums);
        return $nums;
    }
    function MakeList($arr){
        $str = '<ol>';
        
        foreach ($arr as $value) {
            $str .= '<li>'.$value.'</li>';
        }
        $str .= '</ol>';

        return $str;
    }
?>