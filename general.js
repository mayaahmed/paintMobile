var imageBox = document.getElementById("imageBox");   
var editTextBox = document.getElementById("editTextBox");  

var paintBox = document.getElementById("paintBox"); 
var eraseRadio = document.getElementById("eraseRadio");
var freeDrawRadio = document.getElementById("freeDrawRadio");

slideOpen(paintDiv);
imageBox.addEventListener("click", showImageBox, false);
paintBox.addEventListener("click", showPaintBox, false);
editTextBox.addEventListener("click", showTextBox, false);

function showImageBox(){
imageInitial();
slideClose(textDiv);
slideClose(paintDiv);
}

function showPaintBox(){

slideOpen(paintDiv);
slideClose(textDiv);
slideClose(imageDiv);
}

function showTextBox(){
textInitial();
slideClose(imageDiv);
slideClose(paintDiv);
}


function saveCanvas(){



 var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  

 window.location.href=image; // it will save locally
}



