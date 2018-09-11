var imageBox = document.getElementById("imageBox");   
var editTextBox = document.getElementById("editTextBox"); 
var paintBox = document.getElementById("paintBox");  

function doMouseDown(e){

    if (imageBox.checked) imageMouseDown(e);
    else if (editTextBox.checked) textMouseDown(e);
    else  dragStart(e);
}

function doMouseMove(e){
    if (imageBox.checked)  imageMouseMove(e);
    else if (editTextBox.checked) textMouseMove(e);
    else drag(e);
}

function doMouseUp(e){
    if (imageBox.checked)  imageMouseUp(e);
    else if (editTextBox.checked) textMouseUp(e);
    else dragStop(e);
}

function doMouseOut(e){
    if (imageBox.checked) 
	imageMouseOut(e);
    else if (editTextBox.checked) textMouseOut(e);
}
