var i = 0;
var text = "'SIMPLE , EASY AND IN INTERACTIVE WAY'";
var speed = 100 ; 

function typewriter(){
    if(i < text.length){
        document.getElementById('typewritting').innerHTML += text.charAt(i);
        i++
        setTimeout(typewriter,speed)
    }
}
 document.addEventListener('DOMContentLoaded', typewriter);

 
 