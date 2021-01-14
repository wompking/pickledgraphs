(function() {
	'use strict';
	
	function imageCallback(imgDat) {
		let outstr = '';
		for (let k = 0; k < Math.floor(imgDat.data.length); k += 1) {
			const d = imgDat.data[k];
			// console.log(d)
			if ( ( d % 2 == 0 ) && ( d > 0 ) ) {
				outstr += String.fromCharCode(Math.floor(d/2));
			}
		}
		console.log(outstr);
		const state = JSON.parse(outstr);
		Calc.setState(state);

	}
	
	let background = document.createElement('div');
	background.style.position = 'fixed';
	background.style.left = '0';
	background.style.top = '0';
	background.style.width = '100%';
	background.style.height = '100%';
	background.style.zIndex = '99';
	background.style.background = 'rgba(0,0,0,0.4)';
	let dialFrame = document.createElement('div');
	dialFrame.style.position = 'absolute';
	dialFrame.style.padding = '12px';
	dialFrame.style.left = '50%';
	dialFrame.style.top = '50%';
	dialFrame.style.transform = 'translate(-50%, -50%)';
	dialFrame.style.background = 'white';
	let promptButton = document.createElement('input');
	promptButton.setAttribute('type', 'file');
	promptButton.setAttribute('accept', 'image/png');
	promptButton.style.display = 'block';
	let cancelButton = document.createElement('button');
	cancelButton.setAttribute('type', 'button');
	cancelButton.innerText = 'Cancel';
	cancelButton.style.display = 'block';
	
	document.body.appendChild(background);
	background.appendChild(dialFrame);
	dialFrame.appendChild(promptButton);
	dialFrame.appendChild(cancelButton);
	
	promptButton.addEventListener('change', buttonChange);
	cancelButton.addEventListener('click', cancelClick);
	
	function removeListeners() {
		promptButton.removeEventListener('change', buttonChange);
		cancelButton.removeEventListener('click', cancelClick);
	}
	
	function buttonChange(evt) {
		let fread = new FileReader();
		fread.addEventListener('load', () => {
			let tImg = document.createElement('img');
			tImg.addEventListener('load', () => {
				let canv = document.createElement('canvas');
				canv.setAttribute('width', tImg.width + 'px');
				canv.setAttribute('height', tImg.height + 'px');
				let ctx = canv.getContext('2d');
				ctx.drawImage(tImg, 0, 0);
				setTimeout(() => {
					imageCallback(ctx.getImageData(0, 0, tImg.width, tImg.height));
				}, 0);
			}, {once: true});
			tImg.src = fread.result;
		}, {once: true});
		
		fread.readAsDataURL(evt.target.files[0]);
		console.log('pixel data was read');
		removeListeners();
		background.remove();
	}
	
	function cancelClick(evt) {
		console.log('dialog was canceled');
		removeListeners();
		background.remove();
	}
}());
