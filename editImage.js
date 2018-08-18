
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
            {
 		img = new Image();
		img.src=  fileLoadedEvent.target.result;
		
		
		var  len = gallery.length;
		gallery[len]={img: img, imageX: 50, imageY: 50, imageWidth: 200, imageHeight: 200, imageRight: 0, imageBottom: 0};
		gallery[len].imageRight=gallery[len].imageX+gallery[len].imageWidth;
      		gallery[len].imageBottom=gallery[len].imageY+gallery[len].imageHeight;
		restoreSnapshot();
		draw(false,false,   gallery[len]); 
		
		
            };

            fileReader.readAsDataURL(fileToLoad);
        }
    }
}


function imageDrawAll(){


    for(var i=0;i<gallery.length;i++)
        draw(false,false,gallery[i] );

}


function imageDrawAllWithAnchors(){


    for(var i=0;i<gallery.length;i++)
        draw(true,true,gallery[i] );



}

function imageDrawAllWithBorders(){


    for(var i=0;i<gallery.length;i++)
        draw(false,true,gallery[i] );



}

function draw(withAnchors,withBorders,pic ){
    

    // draw the image
    context.drawImage(pic.img,0,0,pic.img.width,pic.img.height,pic.imageX,pic.imageY,pic.imageWidth,pic.imageHeight);

    // optionally draw the draggable anchors
    if(withAnchors){
	  drawDragAnchor(pic.imageX,pic.imageY);
	  drawDragAnchor(pic.imageRight,pic.imageY);
	  drawDragAnchor(pic.imageRight,pic.imageBottom);
	  drawDragAnchor(pic.imageX,pic.imageBottom);
    }

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


function drawDragAnchor(x,y){
    context.beginPath();
    context.arc(x,y,resizerRadius,0,pi2,false);
    context.closePath();
    context.fill();
}


function anchorHitTest(x,y,pic){

    var dx,dy;

    // top-left
    dx=x-pic.imageX;
    dy=y-pic.imageY;
    if(dx*dx+dy*dy<=rr){ return(0); }
    // top-right
    dx=x-pic.imageRight;
    dy=y-pic.imageY;
    if(dx*dx+dy*dy<=rr){ return(1); }
    // bottom-right
    dx=x-pic.imageRight;
    dy=y-pic.imageBottom;
    if(dx*dx+dy*dy<=rr){ return(2); }
    // bottom-left
    dx=x-pic.imageX;
    dy=y-pic.imageBottom;
    if(dx*dx+dy*dy<=rr){ return(3); }
    return(-1);

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
    
    draggingResizer=anchorHitTest(startX,startY,gallery[selectedImage]);
    draggingImage= draggingResizer<0 && hitImage(startX,startY, gallery[selectedImage]);
}

function imageMouseUp(e){
    draggingResizer=-1;
    draggingImage=false;  
    restoreSnapshot();
    imageDrawAll();
    // draw(false,false,gallery[selectedImage]);
    //	selectedImage=-1;
}

function imageMouseOut(e){
    imageMouseUp(e);
}

function imageMouseMove(e){

    if(draggingResizer>-1){

        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);

        // resize the image
        switch(draggingResizer){
        case 0: //top-left
            gallery[selectedImage].imageX=mouseX;
            gallery[selectedImage].imageWidth=gallery[selectedImage].imageRight-mouseX;
            gallery[selectedImage].imageY=mouseY;
            gallery[selectedImage].imageHeight=gallery[selectedImage].imageBottom-mouseY;
            break;
        case 1: //top-right
            gallery[selectedImage].imageY=mouseY;
            gallery[selectedImage].imageWidth=mouseX-gallery[selectedImage].imageX;
            gallery[selectedImage].imageHeight=gallery[selectedImage].imageBottom-mouseY;
            break;
        case 2: //bottom-right
            gallery[selectedImage].imageWidth=mouseX-gallery[selectedImage].imageX;
            gallery[selectedImage].imageHeight=mouseY-gallery[selectedImage].imageY;
            break;
        case 3: //bottom-left
            gallery[selectedImage].imageX=mouseX;
            gallery[selectedImage].imageWidth=gallery[selectedImage].imageRight-mouseX;
            gallery[selectedImage].imageHeight=mouseY-gallery[selectedImage].imageY;
            break;
        }

        // enforce minimum dimensions of 25x25
        if(gallery[selectedImage].imageWidth<25){gallery[selectedImage].imageWidth=25;}
        if(gallery[selectedImage].imageHeight<25){gallery[selectedImage].imageHeight=25;}

        // set the image right and bottom
        gallery[selectedImage].imageRight=gallery[selectedImage].imageX+gallery[selectedImage].imageWidth;
        gallery[selectedImage].imageBottom=gallery[selectedImage].imageY+gallery[selectedImage].imageHeight;

        // redraw the image with resizing anchors
	//  restoreSnapshot();
	//   draw(true,true,gallery[selectedImage]);

    }else if(draggingImage){

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
	//   draw(false,true, gallery[selectedImage]);
	imageDrawAllWithBorders();	
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

draw(true,true, gallery[selectedImage]);
 //   drawAnchors(gallery[selectedImage]);

}

function drawAnchors(pic){
    drawDragAnchor(pic.imageX,pic.imageY);
    drawDragAnchor(pic.imageRight,pic.imageY);
    drawDragAnchor(pic.imageRight,pic.imageBottom);
    drawDragAnchor(pic.imageX,pic.imageBottom);

}
