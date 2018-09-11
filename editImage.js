var offsetX= canvas.offsetLeft;
var offsetY= canvas.offsetTop;
var startX;
var startY;
var isDown=false;


var pi2=Math.PI*2;
var resizerRadius=8;
var rr=resizerRadius*resizerRadius;
var draggingResizer={x:0,y:0};

var imageWidth,imageHeight,imageRight,imageBottom;
var draggingImage=false;

var selectedImage=-1;


function loadImageFileAsURL()
{

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        if (fileToLoad.type.match("image.*"))
        {
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) 
            {	var  len = gallery.length; 
 		img = new Image();
		img.src=  fileLoadedEvent.target.result;
		gallery[len]={img: img, imageX: 50, imageY: 50, imageWidth: 200, imageHeight: 200, imageRight: 0, imageBottom: 0, angle: 0};
		gallery[len].imageRight=gallery[len].imageX+gallery[len].imageWidth;
      		gallery[len].imageBottom=gallery[len].imageY+gallery[len].imageHeight;
		draw(false,gallery[len] );
		
		
            };

            fileReader.readAsDataURL(fileToLoad);
        }
    }
}


function imageDrawAll(){
    console.log(gallery.length);

    for(var i=0;i<gallery.length;i++)
        draw(false,gallery[i] );

}



function imageDrawAllWithBorders(){


    for(var i=0;i<gallery.length;i++)
        draw(true,gallery[i] );



}

function draw(withBorders,pic ){
console.log(pic.img.width);


     // draw the image
    
    if(pic.angle>0){
	console.log(pic.angle);
	context.save();
context.translate(pic.imageX,pic.imageY);
context.translate(pic.imageWidth/2,pic.imageHeight/2);

	context.rotate(pic.angle*Math.PI/180.0);
context.drawImage(pic.img,-pic.imageWidth/2,-pic.imageHeight/2,pic.imageWidth,pic.imageHeight);

		context.restore(); 
	

    }



    else  context.drawImage(pic.img,pic.imageX,pic.imageY,pic.imageWidth,pic.imageHeight);


    // optionally draw the connecting anchor lines
    if(withBorders){
        context.beginPath();
        context.moveTo(pic.imageX,pic.imageY);
        context.lineTo(pic.imageRight,pic.imageY);
        context.lineTo(pic.imageRight,pic.imageBottom);
        context.lineTo(pic.imageX,pic.imageBottom);
        context.closePath();
        context.stroke();
    }
    
}





function hitImage(x,y,pic){
    return(x>pic.imageX && x<pic.imageX+pic.imageWidth && y>pic.imageY && y<pic.imageY+pic.imageHeight);
}


function imageMouseDown(e){
    
    startX=parseInt(e.clientX-offsetX);
    startY=parseInt(e.clientY-offsetY);

    for(var i=0;i<gallery.length;i++){
        if(hitImage(startX,startY,gallery[i]))
            selectedImage=i;
    }
    
    
    draggingImage=hitImage(startX,startY, gallery[selectedImage]);
}

function imageMouseUp(e){
    
    draggingImage=false;  
  //  draw(false,gallery[selectedImage]);
//    selectedImage= -1;
imageDrawAll();
}

function imageMouseOut(e){
    imageMouseUp(e);
}

function imageMouseMove(e){

    
    if(draggingImage){

        imageClick=false;

        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);

        // move the image by the amount of the latest drag
        var dx=mouseX-startX;
        var dy=mouseY-startY;
        gallery[selectedImage].imageX+=dx;
        gallery[selectedImage].imageY+=dy;
        gallery[selectedImage].imageRight+=dx;
        gallery[selectedImage].imageBottom+=dy;
        // reset the startXY for next time
        startX=mouseX;
        startY=mouseY;

        // redraw the image with border 
	restoreSnapshot();
imageDrawAll();
    }
}


function imageInitial(){

    slideOpen(imageDiv);
    takeSnapshot();
}



function deleteLastImage(){
    
    gallery.pop();
    restoreSnapshot();
    imageDrawAll();    

}


function imageDrawResize(){

    draw(true, gallery[selectedImage]);
    //   drawAnchors(gallery[selectedImage]);

}



function changeImageWidth(width) {
if(selectedImage == -1)
selectedImage= gallery.length-1;
  
    gallery[selectedImage].imageWidth= width;
gallery[selectedImage].imageRight=gallery[selectedImage].imageX+gallery[selectedImage].imageWidth;
      	//	gallery[selectedImage].imageBottom=gallery[selectedImage].imageY+gallery[selectedImage].imageHeight;

 restoreSnapshot();
imageDrawAll();
// draw(false, gallery[selectedImage]);
    
    
}


function changeImageHeight(height) {
if(selectedImage == -1)
selectedImage= gallery.length-1;
    
    gallery[selectedImage].imageHeight = height;
// gallery[selectedImage].imageRight=gallery[selectedImage].imageX+gallery[selectedImage].imageWidth;
      		gallery[selectedImage].imageBottom=gallery[selectedImage].imageY+gallery[selectedImage].imageHeight;
 restoreSnapshot();
imageDrawAll();
  //  draw(false, gallery[selectedImage]);
}   








function changeAngle(theta) {

selectedImage= gallery.length-1;
console.log(selectedImage);
    gallery[selectedImage].angle = theta;
    console.log( gallery[selectedImage].angle );
    restoreSnapshot();
    imageDrawAll();
}   
