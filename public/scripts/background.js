$(document).ready(function(){
var header = $('body');

var backgrounds = new Array(
    'url("../images/background.png")'
  , 'url("../images/background1.png")'
);

var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 1); //switch background photo form time to time

header.css('background-image', backgrounds[0]);
});