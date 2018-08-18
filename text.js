// an array to hold text objects


var fontSize = 22;;
var fontType ="verdana";
context.font=fontSize +"px " + fontType;  

// this var will hold the index of the hit-selected text
var selectedText=-1;


// test if x,y is inside the bounding box of texts[textIndex]

function textHittest(x,y,textIndex){

    var text=texts[textIndex];
    return(x>=text.x && 
           x<=text.x+text.width &&
           y>=text.y-text.height && 
           y<=text.y);
}


// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function textMouseDown(e){
    e.preventDefault();
    startX=parseInt(e.clientX-offsetX);
    startY=parseInt(e.clientY-offsetY);
    // Put your mousedown stuff here
    for(var i=0;i<texts.length;i++){
        if(textHittest(startX,startY,i)){
            selectedText=i;
        }
    }
}

// done dragging
function textMouseUp(e){
    e.preventDefault();
    selectedText=-1;
}

// also done dragging
function textMouseOut(e){
    e.preventDefault();
    selectedText=-1;
}
// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function textMouseMove(e){

    if(selectedText<0){return;}
    e.preventDefault();
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);

    // Put your mousemove stuff here
    var dx=mouseX-startX;
    var dy=mouseY-startY;
    startX=mouseX;
    startY=mouseY;

    var text=texts[selectedText];
    text.x+=dx;
    text.y+=dy;
    restoreSnapshot();
textDrawAll();

   
}


var textSubmitButton = document.getElementById("textSubmit");
textSubmitButton.addEventListener("click", writeText, false);
var textShadowButton = document.getElementById("textShadowOption");
var shadow=document.getElementById("shadow");

function writeText(){
  fontType = document.querySelector('input[type="radio"][name="font"]:checked').value;
    
// calc the y coordinate for this text on the canvas
    var y=texts.length*20+100;

    // get the text from the input element
    var value = document.getElementById("theText").value;
    var text={text: value,x:20,y:y, color: context.fillStyle,  fontType:fontType, fontSize: fontSize,  shadow: 0};
    context.font  = text.fontSize +"px " + text.fontType;  
   
    
    
    text.width=context.measureText(text.text).width;
    text.height=16;

    // put this new text in the texts array
    texts.push(text);


    

     textDraw(texts[texts.length-1]);

}


function changeFontSize() {
    fontSize=this.value;
    event.stopPropagation();

}


function changeFont(font) {
    fontType=this.value;
    event.stopPropagation();

}


var radios = document.forms["formA"].elements["font"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        changeFont(this.value);
    }
} 

function changeTextShadow(){

    context.shadowColor="black";
    context.shadowBlur= shadow.value;
    this.value;
    context.lineWidth=5;
    
}




function textDraw(text){

    context.fillStyle = text.color;
  context.font  = text.fontSize +"px " + text.fontType;  
     
    context.fillText(text.text,text.x,text.y);
    
}



// clear the canvas & redraw all texts
function textDrawAll(){


    for(var i=0;i<texts.length;i++){
        var text=texts[i];

	if(text.shadow>0)  textDrawWithShadow(texts[i]);
        else textDraw(texts[i]);
    }

}

function textInitial(){

    slideOpen(textDiv);
    takeSnapshot();
}


function deleteLastText(){
    console.log('popb'+texts.length);
    texts.pop();
    console.log('pop'+texts.length);
    restoreSnapshot();
    textDrawAll();    

}
