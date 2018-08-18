var canvas = document.getElementById('canvas');
var context=canvas.getContext('2d');
var snapshotYes=0;
var eraseIndicator =0;

// create backing canvas
var backCanvas = document.createElement('canvas');
backCanvas.width = canvas.width;
backCanvas.height = canvas.height;
var backCtx = backCanvas.getContext('2d');

var     dragging = false,
dragStartLocation,
snapshot, savedSnapshot;

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
    y = event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}

function takeSnapshot() {

    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    snapshotYes = 1;
    gallery=[];  texts=[];
    
}


function deleteStep() {
    console.log("time to draw");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backCanvas, 0,0);
}


function restoreSnapshot() {
    if(snapshotYes==1)
	context.putImageData(snapshot, 0, 0);
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
    
    

}

function drawQCurve(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    var cpx =  dragStartLocation.x;  var cpy=  position.x/2;
    context.quadraticCurveTo(cpx, cpy, position.x, position.y);
    context.stroke();
    
    
}



function erase(position, esize) {
    if(dragging==true){
	context.clearRect(position.x, position.y, esize, esize);

	takeSnapshot();
    }
}


function drawFree(position) {
    if(dragging==true){
	context.lineTo(position.x, position.y);
	context.stroke();
	takeSnapshot();
    }
}

function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
    

}

function drawPolygon(position, sides, angle) {
    var coordinates = [],
    radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
    index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);

    }

    context.closePath();
}

function drawP(position) {
    var fillBox = document.getElementById("fillBox"),
    shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
    polygonSides = document.getElementById("polygonSides").value,
    polygonAngle = document.getElementById("polygonAngle").value,
    lineCap = document.querySelector('input[type="radio"][name="lineCap"]:checked').value,
    eraseDim = document.getElementById("eraseArea").value;
    
    
    context.lineCap = lineCap;
   
    
    if (shape === "eraser") {
	erase(position, eraseDim);
    }

    if (shape === "free") {
        drawFree(position);
    }

    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "line") {
        drawLine(position);
    }

    if (shape === "qcurve") {
        drawQCurve(position);
    }

    if (shape === "polygon") {
        drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
    }

    if (shape !== "line" && shape !== "free" && shape!=="bcurve") {
        if (fillBox.checked) {
            context.fill();
            
        } else {
            context.stroke();
            

        }
    }
    
}


function dragStart(event) {

    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    backCtx.drawImage(canvas, 0,0);
    takeSnapshot();
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    canvas.addEventListener('mousemove', drag, false);

}

function drag(event) {
    
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawP(position);
	
    }
}



function dragStop(event) {
    
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawP(position);

}

function changeLineWidth() {
    context.lineWidth = this.value;
    event.stopPropagation();
}

function changeFillStyle() {
    context.fillStyle = this.value;
    event.stopPropagation();
}

function changeStrokeStyle() {
    context.strokeStyle = this.value;
    event.stopPropagation();
}

function changeBackgroundColor() {
    context.save();
    canvas.style.background = document.getElementById("backgroundColor").value;  
    context.restore(); 	takeSnapshot();
}

function eraseCanvas() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
 canvas.style.background ="#FFFFE0";
gallery=[];
text=[];
}

function init() {

    
    var lineWidth = document.getElementById("lineWidth"),
    fontSize = document.getElementById("fontSize"),
    fillColor = document.getElementById("fillColor"),
    strokeColor = document.getElementById("strokeColor"),
    canvasColor = document.getElementById("backgroundColor"),
    clearCanvas = document.getElementById("clearCanvas");
    deleteLastStep = document.getElementById("deleteLastStep");
    undoTextBtn = document.getElementById("undoText");
    applyImage = document.getElementById("applyOptionImage"),
    applyText = document.getElementById("applyOptionText");




    
    context.strokeStyle = strokeColor.value;
    context.fillStyle = fillColor.value;
    context.lineWidth = lineWidth.value;


    canvas.addEventListener('mousedown', doMouseDown, false);
    canvas.addEventListener('mousemove', doMouseMove, false);
    canvas.addEventListener('mouseup',doMouseUp, false);
    canvas.addEventListener('mouseout',doMouseOut, false);
    lineWidth.addEventListener("input", changeLineWidth, false);
    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);
    canvasColor.addEventListener("input", changeBackgroundColor, false);
    
    undoTextBtn.addEventListener("click", deleteLastText, false);
    deleteLastStep.addEventListener("click", deleteStep, false);
    fontSize.addEventListener("input", changeFontSize, false);
    
   
    clearCanvas.addEventListener("click", eraseCanvas, false);
    takeSnapshot();
}


window.addEventListener('load', init, false);




