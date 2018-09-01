function initCanvas() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        context = canvas.getContext("2d");
        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas();
    }
}

function resizeCanvas() {
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    /*canvas.width = window.innerWidth-80;
    canvas.height = window.innerHeight-300;*/
}

initCanvas();
var snapshotYes=0;
var texts= new Array();
var gallery = new Array();

document.getElementById('paintDiv').visibility="visible";



function takeSnapshot() {

    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    snapshotYes = 1;
    gallery=[];  texts=[];
    
}

function slideOpen(el){
el.style.width="100%";
el.style.height="100%";
el.style.visibility="visible";
}

function slideClose(el){
// el.style.transition="height 1s linear 0s";
el.style.width="0px";
el.style.height="0px";
el.style.border="none";
el.style.visibility="hidden";
}






var canvas;
var canvasWidth;
var context;



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(elementDiv) {
   elementDiv.classList.toggle("show");
}




// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
