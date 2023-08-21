var win_Knowledge =  // описание элементов окна ссылок
    `<div style="display: flex; width: 550px;">
        <span style="width: 550px">
			<span style="cursor: -webkit-grab;">
				<div style="margin: 5px; width: 550;">
					<button title="Скрытие меню" id="hideMeKnowledge" class="buttonHide">hide</button>
				</div>
				<div style="margin: 5px; width: 550px;" id="testField">
					<input></input>
					<button id="SearchForWord">🔎Find</button>
					<select id="lessonTypeList"></select>
					<select id="CategoryNameList"></select>
						<div style="margin: 5px; width: 550px" id="test_box">
				
						</div>
				</div>

			</span>
	</span>
</div>`;

if (localStorage.getItem('winTopKnwoledge') == null) { // началоное положение окна ссылок (если не задано ранее)
    localStorage.setItem('winTopKnwoledge', '120');
    localStorage.setItem('winLeftKnowledge', '295');
}

let wintKnowledge = document.createElement('div'); // создание окна ссылок
document.body.append(wintKnowledge);
wintKnowledge.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopKnwoledge') + 'px; left: ' + localStorage.getItem('winLeftKnowledge') + 'px; font-size: 14px; z-index: 10000; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintKnowledge.style.display = 'none';
wintKnowledge.setAttribute('id', 'AF_Knowledge');
wintKnowledge.innerHTML = win_Knowledge;

wintKnowledge.onmousedown = function(event) {
  if (checkelementtype(event)) {
    let startX = event.clientX;
    let startY = event.clientY;
    let elemLeft = wintKnowledge.offsetLeft;
    let elemTop = wintKnowledge.offsetTop;

    function onMouseMove(event) {
      let deltaX = event.clientX - startX;
      let deltaY = event.clientY - startY;

      wintKnowledge.style.left = (elemLeft + deltaX) + "px";
      wintKnowledge.style.top = (elemTop + deltaY) + "px";

      localStorage.setItem('winTopKnwoledge', String(elemTop + deltaY));
      localStorage.setItem('winLeftKnowledge', String(elemLeft + deltaX));
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mouseup', onMouseUp);
  }
};

let knowDataContainer;

async function getKnowData() { // получаем из файла список версий моб. приложений
	let knowData;
	knowData = 'https://script.google.com/macros/s/AKfycbySlhuMPHSKHiI6Rhoyg797id3lbPg_zdeG_iBoEvYxwqlxkD4QizWm8OJDEucma7tGyg/exec'
	await fetch(knowData).then(r => r.json()).then(r => versionsdata = r)
	knowDataContainer = versionsdata.result;
	console.log(knowDataContainer) //получим список версий
}

document.getElementById('knowledgeCenter').onclick = function() {
	if (document.getElementById('AF_Knowledge').style.display == "none") {
		document.getElementById('AF_Knowledge').style.display = ""
		document.getElementById('knowledgeCenter').classList.add('activeScriptBtn');
		getKnowData()
	} else {
		document.getElementById('AF_Knowledge').style.display = "none"
		document.getElementById('knowledgeCenter').classList.remove('activeScriptBtn');
	}
	
}

document.getElementById('hideMeKnowledge').onclick = function(){
	document.getElementById('AF_Knowledge').style.display = "none"
	document.getElementById('knowledgeCenter').classList.remove('activeScriptBtn');
}