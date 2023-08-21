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
					<br>
					<select id="lessonTypeList">
						<option style="background-color:#69b930; text-align: center;  color: white; font-weight: 700;" value="lType">Тип урока</option>
					</select>
					<select id="CategoryNameList">
						<option style="background-color:DeepSkyBlue; text-align: center;  color: white; font-weight: 700;" value="CatType">Категория</option>
					</select>
						<div style="margin: 5px; width: 550px" id="ProblemsName">
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
let dropdown0;
let dropdown1;
async function getKnowData() { // получаем из файла список версий моб. приложений
	let knowData;
	
	if (dropdown0) {
    while(dropdown0.options.length > 1) {
        dropdown0.remove(1);
    }
	
	while(dropdown1.options.length > 1) {
        dropdown1.remove(1);
    }
	
}

	knowData = 'https://script.google.com/macros/s/AKfycbySlhuMPHSKHiI6Rhoyg797id3lbPg_zdeG_iBoEvYxwqlxkD4QizWm8OJDEucma7tGyg/exec'
	await fetch(knowData).then(r => r.json()).then(r => versionsdata = r)
	knowDataContainer = versionsdata.result;
	console.log(knowDataContainer) //получим обект с информацией
	
// Наполняем первый dropdown
		const uniqueValues0 = [...new Set(knowDataContainer.map(item => item[0]))];
		dropdown0 = document.getElementById("lessonTypeList");
		uniqueValues0.forEach(value => {
			const option = document.createElement("option");
			option.value = value;
			option.textContent = value;
			dropdown0.appendChild(option);
		});

		dropdown1 = document.getElementById("CategoryNameList");

		// Функция обновления второго dropdown на основе выбора в первом
		dropdown0.addEventListener("change", function() {
			const selectedValue = this.value;
			
			    // Проверяем, существует ли опция "Категория"
				let catOptionExists = false;
				for(let i = 0; i < dropdown1.options.length; i++) {
					if(dropdown1.options[i].value === "CatType") {
						catOptionExists = true;
						break;
					}
				}

				// Если опции "Категория" нет, то добавляем её
				if(!catOptionExists) {
					const catOption = document.createElement("option");
					catOption.style = "background-color:DeepSkyBlue; text-align: center; color: white; font-weight: 700;";
					catOption.value = "CatType";
					catOption.textContent = "Категория";
					dropdown1.appendChild(catOption);
				}

			// Очищаем второй dropdown
			while(dropdown1.options.length > 1) {
				dropdown1.remove(1);
			}

			// Получаем значения для второго dropdown на основе выбранного значения в первом
			const secondDropdownValues = [...new Set(knowDataContainer
				.filter(item => item[0] === selectedValue)
				.map(item => item[1]))];

			// Наполняем второй dropdown
			secondDropdownValues.forEach(value => {
				const option = document.createElement("option");
				option.value = value;
				option.textContent = value;
				dropdown1.appendChild(option);
			});
		});
		
		const problemsDiv = document.getElementById("ProblemsName");

		dropdown1.addEventListener("change", function() {
			const selectedType = dropdown0.value;
			const selectedCategory = this.value;

			// Очистить div перед добавлением новых данных
			problemsDiv.innerHTML = '';

			// Найти соответствующие проблемы для выбранной категории
			const problems = knowDataContainer
				.filter(item => item[0] === selectedType && item[1] === selectedCategory)
				.map(item => item[2]);

			// Добавить каждую проблему в div
			problems.forEach(problem => {
				const problemElem = document.createElement("div");
				problemElem.style = "background: lightsteelblue;   width: 96%;    border-radius: 10px;    text-align: center;    font-weight: 800; border-bottom: 1px solid black;"
				problemElem.setAttribute('name','exploreSolution')
				problemElem.textContent = problem;
				problemsDiv.appendChild(problemElem);
			});
		});
}

document.getElementById('knowledgeCenter').onclick = function() {
	if (document.getElementById('AF_Knowledge').style.display == "none") {
		document.getElementById('AF_Knowledge').style.display = ""
		document.getElementById('knowledgeCenter').classList.add('activeScriptBtn');
		getKnowData()
	} else {
		document.getElementById('AF_Knowledge').style.display = "none"
		document.getElementById('knowledgeCenter').classList.remove('activeScriptBtn');
		document.getElementById('ProblemsName').innerHTML = ''
	}
	
}

document.getElementById('hideMeKnowledge').onclick = function(){
	document.getElementById('AF_Knowledge').style.display = "none"
	document.getElementById('knowledgeCenter').classList.remove('activeScriptBtn');
	document.getElementById('ProblemsName').innerHTML = ''
}