const Str = JSON.stringify(Calc.getState());
var codearray = [];
for ( i = 0; i < Str.length; i++ ){
    codearray.push(2*Str.charCodeAt(i));
}
var thirdl = Math.floor(codearray.length / 3);
const add = codearray.length-(thirdl*3);
for ( j = 0; j < add; j++ ){
	//console.log("test")
	codearray.push(0);
}
var loop = true;
var addpixel = 0;
while (loop){
	var thirdl = Math.floor(codearray.length / 3);
	var s = Math.sqrt(thirdl);
	var factors = [];
	for (let i = 1; i <= thirdl; i++) {
	    // check if number is a factor
	    if (thirdl % i == 0) {
	        factors.push(i);
	    }
	}
	factors.sort((a,b)=>(Math.abs(a-s) < Math.abs(b-s) ? -1 : 1));
	var height = factors[0];
	var ratio = thirdl / ( height * height );
	if ( (ratio > 2) || (ratio < 0.5) ){
		codearray.push(0);
		codearray.push(0);
		codearray.push(0);
		addpixel++
	} else {
		loop = false;
	}
}
console.log(addpixel)
const width = Math.floor(thirdl/height);


const canv = document.createElement('canvas');
canv.setAttribute('width', `${width}px`);
canv.setAttribute('height', `${height}px`);
const ctx = canv.getContext('2d');
const imageData = ctx.createImageData(width, height);

// Iterate through every pixel
for (let k = 0; k < Math.floor(imageData.data.length/4); k += 1) {
	let putidx = k * 4
	let getidx = k * 3
	// Modify pixel data
	imageData.data[putidx + 0] = codearray[getidx + 0];  // R value
	imageData.data[putidx + 1] = codearray[getidx + 1];    // G value
	imageData.data[putidx + 2] = codearray[getidx + 2];  // B value
	imageData.data[putidx + 3] = 255;  // A value
}

// Draw image data to the canvas
ctx.putImageData(imageData, 0, 0);
du = canv.toDataURL()
console.log(du);
copy(du);