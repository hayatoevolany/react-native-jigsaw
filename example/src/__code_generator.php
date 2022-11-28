<?php
include './__api_generator.php';

function dfs($json)
{
    $string = '';
    $closing = [];
    $stack = $json;
    $nesting = 4; // initial nesting depth

    $add_to_str = function ($str, $nest = 0) use (&$nesting, &$string) {
        $string .= str_repeat('  ', $nesting + $nest) . $str . PHP_EOL;
    };

    while (count($stack) > 0) {
        $curr = array_pop($stack);

        // Get element
        $el = $curr->element;

        if ($el === 'Fetch') {

            $api_str = generate_api_GET($curr);

            $api_file = fopen("__api_file.js", "w") or die("Unable to open file!");

            file_put_contents("__api_file.js", "");
            fwrite($api_file, $api_str);

            fclose($api_file);

        }
        // Add to closing tag stack
        $closing[] = $el;

        // Create opening tag
        $add_to_str('<' . $el);

        // add props to element
        foreach (get_object_vars($curr) as $key => $value) {
            if ($el === 'Fetch') continue; // TODO: for now.

            if (in_array($key, ['children', 'element', 'styles']))
                continue;

            // Quote non-numerics
            if (!is_numeric("$value"))
                $value = "\"$value\"";

            // Add prop
            $add_to_str("$key=" . "{" . $value . "}", 1);
        }

        // Close tag
        $add_to_str('>');

        // For children, nesting should increase
        $nesting++;
        $children = $curr->children;
        if ($children) {
            // For text-types, children is string value
            if (gettype($children) === 'string') {
                $add_to_str("{\"" . $children . "\"}");
            } else {
                // children is other components
                foreach ($children as $child)
                    $stack[] = $child;
            }
        }

        // Close tags which need closing
        while (count($closing) > count($stack)) {
            $nesting--;
            $add_to_str('</' . array_pop($closing) . '>');
        }
    }
    return $string;
}






/*
How are we gonna do data fetching? 
We want to just have it on the screen i think. that'd be simplest and easiest...
but then, the whole fetch component would be really useful too.


How about we just try to make a fetch component? See how it goes.

1. Write it out in react
2. convert it to json
3. interpret it in php.

*/

file_put_contents("__newfile.js", "");
$json = file_get_contents('./_json_screen_test_copy.json');
$json = json_decode($json);
$stringo = dfs($json);
echo $stringo;


$stringo =  <<<EOD
import { ScreenContainer, View, Text, TextInput, Image } from 'React';
import Fetch from './App';

const foo = () => {
    return (
$stringo
    );
};
EOD;

$myfile = fopen("__newfile.js", "w") or die("Unable to open file!");

file_put_contents("__newfile.js", "");
fwrite($myfile, $stringo);

fclose($myfile);
