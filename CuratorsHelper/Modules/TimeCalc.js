var win_TimeCalculator = `<div">
						<span style="cursor: -webkit-grab;">
							<div>
								<button class="btn-main" style="width:50px;background: #228B22;font-size: 15px;margin: 5px;padding: 5px;" id="hideTimeCalc">hide</button>
								<button class="btn-main" id="clearallTimeCalc">🧹</button>
							</div>
						</span>	
						
						<div id="main_timecalc">
							<input id="chasiwork" type="text" autocomplete="off" placeholder="Введите количество рабочих часов" style="margin-left: 5%;    width: 90%;    text-align: center;">
							<input id="minutiotsutstvie" type="text" autocomplete="off" placeholder="Введите количество минут отсутствия" style="margin-left: 5%;    width: 90%;    text-align: center;">
							<button class="btn-main" style="margin-left: 45%; margin-top:5px; padding: 5px; border-radius: 20px;" id="calcIt">Calculate</button>
							<div id="calculatedData" style="color:bisque; margin-left: 10px;">
							</div>
						</div>
				   </div>`;

if (localStorage.getItem('winTopTimeCalc') == null) { //additional menu
    localStorage.setItem('winTopTimeCalc', '120');
    localStorage.setItem('winLeftTimeCalc', '295');
}

let wintTimeCalc = document.createElement('div');
document.body.append(wintTimeCalc);
wintTimeCalc.className = 'wintInitializeTimeCalc'
wintTimeCalc.style = 'display:none;  top: ' + localStorage.getItem('winTopTimeCalc') + 'px; left: ' + localStorage.getItem('winLeftTimeCalc') + 'px;';
wintTimeCalc.setAttribute('id', 'Curators_TimeCalc');
wintTimeCalc.innerHTML = win_TimeCalculator;

var listenerTimeCalc = function (e, a) {
    wintTimeCalc.style.left = Number(e.clientX - myXWFMOperCnt) + "px";
    wintTimeCalc.style.top = Number(e.clientY - myYWFMOperCnt) + "px";
    localStorage.setItem('winTopTimeCalc', String(Number(e.clientY - myYWFMOperCnt)));
    localStorage.setItem('winLeftTimeCalc', String(Number(e.clientX - myXWFMOperCnt)));
};
wintTimeCalc.onmousedown = function (a) {
    if (checkelementt(a)) {
        window.myXWFMOperCnt = a.layerX;
        window.myYWFMOperCnt = a.layerY;
        document.addEventListener('mousemove', listenerTimeCalc);
    }
}
wintTimeCalc.onmouseup = function () { document.removeEventListener('mousemove', listenerTimeCalc); }

document.getElementById('wfmtimecalc').onclick = function() {
	if (document.getElementById('Curators_TimeCalc').style.display == "") {
		document.getElementById('Curators_TimeCalc').style.display = "none"
	} else {
		document.getElementById('Curators_TimeCalc').style.display = ""
	}
}

document.getElementById('calcIt').onclick = function() {
    let chasi = Number(document.getElementById('chasiwork').value);
    let minutiotsutstvie = Number(document.getElementById('minutiotsutstvie').value);
    let outputData = document.getElementById('calculatedData');
    let result = '';
    
    if (chasi !== 0 && minutiotsutstvie !== 0) {
        result = (chasi * 60) - minutiotsutstvie;
        outputData.innerHTML = (result / 60).toFixed(2);
    }
};

document.getElementById('hideTimeCalc').onclick = function() {
	document.getElementById('Curators_TimeCalc').style.display = "none"
}