var i = 0;
var text = "'SIMPLE , EASY AND INERACTIVE WAY'";
var speed = 100 ; 

function typewriter(){
    if(i < text.length){
        document.getElementById('typewritting').innerHTML += text.charAt(i);
        i++
        setTimeout(typewriter,speed)
    }
}
 document.body.addEventListener('DOMContentLoaded',typewriter())