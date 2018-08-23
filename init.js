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
    canvas.width = window.innerWidth-120;
    canvas.height = window.innerHeight-300;
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
    // el.style.transition="height 1s linear 0s";
    el.style.height="700px";
    el.style.visibility="visible";
}

function slideClose(el){
    
    
    // el.style.transition="height 1s linear 0s";
    el.style.height="0px";
    el.style.border="none";
}

function slideOpenColor(el){
    // el.style.transition="height 1s linear 0s";
    el.style.height="120px";
    el.style.visibility="visible";
}

var canvas;
var canvasWidth;
var context;



