var canvas = document.getElementById('canvas');
var context=canvas.getContext('2d');
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
function initTouch() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);   
  }
  function touchHandler(event)
  {
  var touches = event.changedTouches,
  first = touches[0],
  type = "";
  switch(event.type)
  {
  case "touchstart": type = "mousedown"; break;
  case "touchmove":  type="mousemove"; break;        
  case "touchend":   type="mouseup"; break;
  default: return;
  }
  var simulatedEvent = document.createEvent("MouseEvent");
   simulatedEvent.initMouseEvent(type, true, true, window, 1,
                      first.screenX, first.screenY,
                      first.clientX, first.clientY, false,
                      false, false, false, 0/*left*/, null);
  first.target.dispatchEvent(simulatedEvent); 
  event.preventDefault();
   }
 
initTouch();
