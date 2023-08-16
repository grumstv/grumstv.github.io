if (localStorage.getItem('defaclschatcolor') == null || localStorage.getItem('defaclschatcolor') == undefined) {
    localStorage.setItem('defaclschatcolor', '#FF47CA')
}
	
//Для таймера автозакрытия
if (localStorage.getItem('aclstime') == null) {
    localStorage.setItem('aclstime', 12);
}

//Для интервала воспроизведения звука
if (localStorage.getItem('splinter') == null) {
    localStorage.setItem('splinter', 3);
}

// Для переключателя вкл/выкл звук
if (localStorage.getItem('audio') == null) {
    localStorage.setItem('audio', 1);
}

var win_Settings =  // описание элементов окна ссылок
  `<span style="width: 500px">
			<span style="cursor: -webkit-grab;">
				<div style="margin: 5px; width: 500px;" id="settings_head">
					<button title="Скрытие меню" id="hideMeSettings" class="buttonHide">hide</button>
				</div>

				<div style="border: 2px double black; background-color: #464451" id="set_bar">
					<div style="margin: 5px; width: 500px">
						<select style="height:28px; width:140px; text-align:center" id="soundlistaddr" onchange="changesoundaddr()">
							<option selected="" disabled="">Звук нового сообщения</option>
							<option value="othersound">Выбрать свой звук</option>
                         </select>
						<button title="Проверка звука при добавленной ссылке" id="sound_test">▶</button>
						<label title="Включение и отключение звука в АФ входящих запросов" class="checkbox-audio">
							<input id="audioswitcher" type="checkbox" checked="">
							<span class="checkbox-audio-switch"></span>
						</label>
						<input id="sound_adr" placeholder="Введи адрес звука" autocomplete="off" type="text" style="display: none; text-align: center; width: 210px; color: black;">
						<button title="Сохраняет ссылки на новый источник звука для входящего запроса в АФ" id="sound_save" style="display: none">💾</button>
						<span style="color:bisque">Громкость</span>
						<input id="range" min="0" max="1" value="1.0" step="0.1" type="range">
						<br>
						<span style="color:bisque">Интервал воспроизведения звука:</span>
						<input title="Ввод интервала в секундах между повторами звука нового чата" id="soundplayinterval" placeholder="N" autocomplete="off" oninput="maxLengthCheck(this)" type="number" maxlength="2" min="0" max="59" style="text-align: center; margin-top: 5px; width: 50px; color: black;">
						<button title="Внести изменения в интервал между повторами звука нового чата" id="setsoundplayinterval" style="margin-top: 5px">SET⌚</button>
						<br>
						<span style="color:bisque">Таймер автозакрытия:</span>
						<input title="Ввод числа для автозакрытия, при этом от этого числа будет отнято 2 минуты чтобы чат закрасился в фиолетовый цвет, то есть при значении по-умолчанию 12 на 10 минуте чат зальется фиолетовым цветом оповещая, что скоро будет закрыт" id="autoclosetime" placeholder="N" autocomplete="off" oninput="maxLengthCheck(this)" type="number" maxlength="2" min="2" max="59" style="text-align: center; margin-top: 5px; width: 50px; color: black; margin-left: 78px;">
						<button title="Внести изменения в таймер автозакрытия" id="setautoclosetime" style="margin-top: 5px">SET⌚</button>
						<br>
						<label style="color:bisque"><input type="checkbox" id="hidelngselector">Скрыть выбор языка АФ</label>
						<label class="onlyfortp" style="color:bisque; margin-left: 5px;"><input type="checkbox" id="hidelpmwindow">Скрыть окно с У П</label>
            <label class="onlyfortp" style="color:bisque; margin-left: 5px;"><input type="checkbox" id="hidestatMM">Статистика MM</label>
						<br>
						<label id="defaulcolorclschat" style="color:bisque;"><input type="color" id="aclstimepicker">Цвет заливки закрытия чата</label>
            <button id="activateVoiceCommands" title="Позволяет изменить кнопку для активации голосовых командю По умолчанию SHIFT" style="margin-left:10px;">Shift</button>
            <br>
						<input class="onlyfortp" id="test_std" placeholder="ID тест У" autocomplete="off" title = "ID личного тестового ученика" type="text" style="text-align: center; width: 100px; color: black;">
						<button class="onlyfortp" id="setteststd" title="Добавить в localstorage ID тестового У" style="margin-top: 5px">💾</button>
						<input class="onlyfortp" id="test_teach" placeholder="ID тест П" autocomplete="off" title = "ID личного тестового преподавателя" type="text" style="text-align: center; width: 100px; color: black;">
						<button class="onlyfortp" id="settestteach" title="Добавить в localstorage ID тестового П" style="margin-top: 5px">💾</button>

					<div style="margin-top: 5px; width: 500px">
						<span style="color:bisque;">Выберите отдел:</span>
						<button class="onlyfortp" onclick="AFthePieceofShit()" id="set_TPrezerv" title="Нажмите если вы из ТП и в АФ не работает Базы Знаний" style="margin-top: 5px">ТП рез</button>
						<button class="onlyfortp" onclick="WeAreTheChempions()" id="set_TP" title="Нажмите если вы из ТП" style="margin-top: 5px">ТП</button>
						<button onclick="ShowMustGoOn()" id="set_KC" title="Нажмите если вы из КЦ" style="margin-top: 5px">КЦ</button>
						<button onclick="AFthePieceofShitKC()" id="set_KCrezerv" title="Нажмите если вы из КЦ и в АФ не работает Базы Знаний" style="margin-top: 5px">КЦ рез</button>
						<br>
					</div>

						<button id="savesettingstofile" title="Сохраняет все настройки из localstorage в отдельный .json файл" style="color: #e5ece6; margin-top: 5px">💾 Сохранить настройки</button>
						<input type="file" id="fileinput" title="Загружает все настройки в localstorage из ранее сохраненного файла настроек в формте .json" style="display:none;">
						<label style="color: #e5ece6; background: #768d87; padding: 5px; border-radius: 5px; border: 1px solid #566963;" for="fileinput">⤵ Загрузить настройки</label>
					</div>
				</div>
			</span>
	</span>`;

if (localStorage.getItem('winTopSettings') == null) { // началоное положение окна ссылок (если не задано ранее)
  localStorage.setItem('winTopSettings', '120');
  localStorage.setItem('winLeftSettings', '295');
}

let wintSettings = document.createElement('div'); // создание окна ссылок
document.body.append(wintSettings);
wintSettings.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopSettings') + 'px; left: ' + localStorage.getItem('winLeftSettings') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintSettings.style.display = 'none';
wintSettings.setAttribute('id', 'AF_Settings');
wintSettings.innerHTML = win_Settings;

var listenerSettings = function (e, a) { // сохранение позиции окна ссылок
  wintSettings.style.left = Number(e.clientX - myXSettings) + "px";
  wintSettings.style.top = Number(e.clientY - myYSettings) + "px";
  localStorage.setItem('winTopSettings', String(Number(e.clientY - myYSettings)));
  localStorage.setItem('winLeftSettings', String(Number(e.clientX - myXSettings)));
};

wintSettings.onmousedown = function (a) { // изменение позиции окна ссылок
  if (checkelementtype(a)) {
    window.myXSettings = a.layerX;
    window.myYSettings = a.layerY;
    document.addEventListener('mousemove', listenerSettings);
  }
}
wintSettings.onmouseup = function () { document.removeEventListener('mousemove', listenerSettings); } // прекращение изменения позиции окна ссылок

function ShowMustGoOn() { //функция вносит в локалсторедж адрес скрипта с гугл таблиц шаблонов для КЦ
  localStorage.setItem('scriptAdr', KC_addr)
  location.reload()
}

function WeAreTheChempions() { //функция вносит в локалсторедж адрес скрипта с гугл таблиц шаблонов для ТП
  localStorage.setItem('scriptAdr', TP_addr)
  localStorage.setItem('tpflag', 'ТП')
  location.reload()
}

function WeAreTheChempionsPrem() { //функция вносит в локалсторедж адрес скрипта с гугл таблиц шаблонов для Premium ТП
  localStorage.setItem('scriptAdr', TPprem_addr)
  localStorage.setItem('tpflag', 'ТПPrem')
  location.reload()
}

function AFthePieceofShit() { //функция вносит в локалсторедж адрес скрипта с гугл таблиц шаблонов для ТП резервных тестовых
  localStorage.setItem('scriptAdr', TP_addrRzrv)
  localStorage.setItem('tpflag', 'ТП')
  location.reload()
}

function getLocalstorageToFile(fileName) { //функция сохранения содержимого localstorage в файл на компьютере

  /* dump local storage to string */

  var a = {};
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    var v = localStorage.getItem(k);
    a[k] = v;
  }

  /* save as blob */

  var textToSave = JSON.stringify(a)
  var textToSaveAsBlob = new Blob([textToSave], {
    type: "application/json"
  });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

  /* download without button hack */

  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = function () {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function changesoundaddr() { //функция изменения адреса звука
  let objSoundList = document.getElementById('soundlistaddr')

  if (objSoundList.length > 1) {
    for (let i = 1; i < objSoundList.length; i++) {
      if (objSoundList[i].selected == true) {
        if (objSoundList[i].value == "othersound") {
          document.getElementById('sound_adr').style.display = ''
          document.getElementById('sound_save').style.display = ''
        } else {
          document.getElementById('sound_adr').style.display = 'none'
          document.getElementById('sound_save').style.display = 'none'
          document.getElementById('sound_adr').value = ""
          console.log(objSoundList[i].textContent + ' ' + objSoundList[i].value)
          localStorage.setItem('sound_str', objSoundList[i].value)
          audio = new Audio(localStorage.getItem('sound_str'))
        }
      }
    }
  }
}

function paintstatus() { //функция перекрашивания статуса оператора онлайн зеленый, занят желтый, офлайн и перерыв красные
    const statusElem = document.querySelectorAll('.user_menu-status-name')[1];
    const buttonElems = document.querySelectorAll('.ant-btn');
    if (!statusElem) {
        return;
    }

    let color;
    let text;
    switch (statusElem.textContent) {
        case "Офлайн":
            color = "red";
            text = "Офлайн";
            break;
        case "Перерыв":
            color = "red";
            text = "Перерыв";
            break;
        case "Онлайн":
            color = "green";
            text = "Онлайн";
            break;
        case "Занят":
            color = "yellow";
            text = "Занят";
            break;
    }

    if (color) {
        let style = `background: ${color}; color: white; font-weight: 700`;
        if (color === "yellow") {
            style += "; color: black";
        }
        statusElem.style = style;

        let buttonElem;
        if (document.URL === "https://skyeng.autofaq.ai/tickets/archive") {
            buttonElem = buttonElems[5];
        } else {
            buttonElem = buttonElems[4];
        }

        if (buttonElem && buttonElem.textContent === text) {
            buttonElem.style.background = color;
        }
    }
}

// Блок настроек и взаимодействия с ними

const soundTestBtn = document.getElementById('sound_test');

soundTestBtn.onclick = function () { // кнопка тест звука
  const isPlaying = soundTestBtn.innerHTML == '▶';
  soundTestBtn.innerHTML = isPlaying ? '⏹' : '▶';
  soundTestBtn.title = isPlaying ? 'Остановить воспроизведение' : 'Проверка звука при добавленной ссылке';
  if (isPlaying) {
    audio.play();
    setTimeout(() => {
      soundTestBtn.innerHTML = '▶';
      soundTestBtn.title = 'Проверка звука при добавленной ссылке';
    }, Number(audio.duration * 1000 + 1).toFixed(0));
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}


if (localStorage.getItem('audiovol') != null) {
  audio.volume = localStorage.getItem('audiovol');
} else localStorage.setItem('audiovol', 1);

document.getElementById('getnewtmpldata').onclick = getText // по клику на кнопку сработает функция обновления шаблонов из документа

document.getElementById('setting').onclick = function () { // открывает параметры
  if (document.getElementById('AF_Settings').style.display == '')
    document.getElementById('AF_Settings').style.display = 'none'
  else {
    document.getElementById('AF_Settings').style.display = ''
    let pushToTalkButton = document.getElementById('activateVoiceCommands');
    if (localStorage.getItem('pushToTalkKeyName')) {
      pushToTalkButton.textContent = localStorage.getItem('pushToTalkKeyName')
    } else {
      localStorage.setItem('pushToTalkKeyCode', 16)
    }

    pushToTalkButton.addEventListener('click', () => {
      pushToTalkButton.textContent = 'Press a key...';
      document.addEventListener('keydown', (event) => {
        pushToTalkButton.textContent = event.code;
        let pushToTalkValue = event.code;
        let pushToTalkKeyCode = event.keyCode;
        localStorage.setItem('pushToTalkKeyName', pushToTalkValue);
        localStorage.setItem('pushToTalkKeyCode', pushToTalkKeyCode)
        document.removeEventListener('keydown', event);
      }, { once: true });
    });

    if (localStorage.getItem('defaclschatcolor') != null || localStorage.getItem('defaclschatcolor') != undefined) {
      document.getElementById('aclstimepicker').value = localStorage.getItem('defaclschatcolor')
    } else {
      localStorage.setItem('defaclschatcolor', '#FF47CA')
      document.getElementById('aclstimepicker').value = localStorage.getItem('defaclschatcolor')
    }

    document.getElementById('aclstimepicker').onchange = function () {
      localStorage.setItem('defaclschatcolor', this.value)
    }

    document.getElementById('defaulcolorclschat').ondblclick = function () {
      localStorage.setItem('defaclschatcolor', '#FF47CA')
      document.getElementById('aclstimepicker').value = localStorage.getItem('defaclschatcolor')
    }

    // скрываем от других отделов возможность включать расширение с ТП  плююшками и шаблонами

    const opsection = document.getElementsByClassName('user_menu-dropdown-user_name')[0].textContent.split('-')[0];

    let needtohide = document.getElementsByClassName('onlyfortp');

    if (opsection !== 'ТП' && opsection !== 'ТПPrem') {
      for (i = 0; i < needtohide.length; i++) {
          needtohide[i].style.display = 'none'
      }
    } else {
      for (i = 0; i < needtohide.length; i++) {
          needtohide[i].style.display = ''
      }
    }

    switch (localStorage.getItem('scriptAdr')) {
      case TP_addr:
        document.getElementById('set_TP').style.background = 'green';
        break;
      case TP_addrRzrv:
        document.getElementById('set_TPrezerv').style.background = 'green';
        break;
      case KC_addr:
        document.getElementById('set_KC').style.background = 'green';
        break;
      case KC_addrRzrv:
        document.getElementById('set_KCrezerv').style.background = 'green';
        break;
      default:
        break;
    }
    //

    let objSoundList = document.getElementById('soundlistaddr')
    let soundsfromdoc;
    let soundsconteiner;

    async function getsoundsfromdoc() { // загрузка списка звуков из файла
      const soundsfromdoc = 'https://script.google.com/macros/s/AKfycbyD1l-oLcE-BBmyN1QmcHKoi0rwVfCwWjE6cfTqw6Y9QQGAju-9inKbwSOfHCI6qBEjtg/exec';
      const response = await fetch(soundsfromdoc);
      const soundsdata = await response.json();
      const soundsconteiner = soundsdata.result;
      console.log(soundsdata.result) //получим список звуков
      soundsconteiner.forEach((sound) => {
        if (sound[0] !== '') {
          addOption(objSoundList, `${sound[0]}`, `${sound[1]}`)
        }
      });
      Array.prototype.forEach.call(objSoundList.children, (option) => { // проверяем какой звук выбран
        if (option.value === localStorage.getItem('sound_str')) {
          option.selected = true;
        }
      });
      if (objSoundList.children[0].selected) {
        objSoundList.children[1].selected = true;
        document.getElementById('sound_adr').style.display = '';
        document.getElementById('sound_save').style.display = '';
        document.getElementById('sound_adr').value = localStorage.getItem('sound_str');
      }
    }

    if (objSoundList.length < 3) {
      getsoundsfromdoc()
    }

    if (localStorage.getItem('test_stud') != "" || localStorage.getItem('test_stud') != null) {
      document.getElementById('test_std').value = localStorage.getItem('test_stud');
    } else document.getElementById('test_std').value = "";

    if (localStorage.getItem('test_teach') != "" || localStorage.getItem('test_teach') != null) {
      document.getElementById('test_teach').value = localStorage.getItem('test_teach');
    } else document.getElementById('test_teach').value = "";

    //Для таймера автозакрытия
    if (localStorage.getItem('aclstime') != null || localStorage.getItem('aclstime') != "") {
      document.getElementById('autoclosetime').value = localStorage.getItem('aclstime');
    } else {
      localStorage.setItem('aclstime', 12);
      document.getElementById('autoclosetime').value = localStorage.getItem('aclstime');
    }

    //для таймера autoclose

    document.getElementById('setautoclosetime').onclick = function () {
      if (document.getElementById('autoclosetime').value != '') {
        localStorage.setItem('aclstime', document.getElementById('autoclosetime').value);
      } else console.log("Базовое значение равно 12 минут")
    }

    //Для интервала между воспроизведением звука
    if (localStorage.getItem('splinter') != null || localStorage.getItem('splinter') != "") {
      document.getElementById('soundplayinterval').value = localStorage.getItem('splinter');
    } else {
      localStorage.setItem('splinter', 3);
      document.getElementById('soundplayinterval').value = localStorage.getItem('splinter');
    }

    document.getElementById('setsoundplayinterval').onclick = function () {
      if (document.getElementById('soundplayinterval').value != '') {
        localStorage.setItem('splinter', document.getElementById('soundplayinterval').value);
      } else console.log("Базовое значение равно 3 секунды")
    }

    document.getElementById('sound_save').onclick = function () { //функция сохранения адреса звукового уведомления о входящем чате в АФ
      localStorage.setItem('sound_str', document.getElementById('sound_adr').value);
      if (document.getElementById('sound_adr').value == "")
        audio = new Audio("https://grumstv.github.io/Sounds/msg.mp3");
      else {
        audio = new Audio(document.getElementById('sound_adr').value);
        document.getElementById('sound_save').textContent = "✅";
        setTimeout(function () {
          document.getElementById('sound_save').textContent = "💾";
        }, 3000);
      }
    }

    if (flagLangBut == 0) {
      document.getElementById('languageAF').onclick = function () {
        if (this.innerHTML == "Русский") {
          this.innerHTML = "Английский";
          document.getElementById('AF_helper').style.background = "#EBC7DF"
        } else {
          this.innerHTML = "Русский";
          document.getElementById('AF_helper').style.background = "#464451"
        }
      }
    }

    //

    let range = document.getElementById('range');
    range.value = localStorage.getItem('audiovol');


    range.onchange = function () {
      if (localStorage.getItem('audiovol') != null) {
        audio.volume = this.value;
        localStorage.setItem('audiovol', audio.volume);
      } else localStorage.setItem('audiovol', this.value);
    }

    // Отображение/скрытие кнопки отправки статистики в ММ
    let flagStatMM = 0;   // функция чекбокса вкл и откл кнопки отправки статистики
    var StatMMboxstatus = document.getElementById('hidestatMM');
    var StatMMBtn = document.getElementById('StatMM');
    StatMMboxstatus.onclick = function () {

      if (!StatMMboxstatus.checked) {
        if(localStorage.getItem('is_sending_MM') == 0){
            flagStatMM = 0;
            localStorage.setItem('hidestatMM', flagStatMM)
            StatMMBtn.style.display = "none";
        } else {
            StatMMboxstatus.checked = true
            alert('Отправка статистики активна. Нельзя скрыть кнопку отправки статитстики');
        }    
      } else {
        StatMMBtn.style.display = "";
        flagStatMM = 1;
        localStorage.setItem('hidestatMM', flagStatMM)
      }
    }

    if (localStorage.getItem('hidestatMM') == 0) {
      StatMMBtn.style.display = "none";
      StatMMboxstatus.checked = false;
    } else {
      StatMMboxstatus.checked = true;
    }

    //Скрыть окно Л П МВУ
    let flaglpm = 0;   // функция чекбокса вкл и откл  информационного окна
    var lpmboxstatus = document.getElementById('hidelpmwindow');
    lpmboxstatus.onclick = function () {

      if (!lpmboxstatus.checked) {
        document.getElementById('testUsers').style.display = "";
        flaglpm = 0;
        localStorage.setItem('disablelpmwindow', flaglpm)
      } else {   // поставить checked, если он не установлен
        document.getElementById('testUsers').style.display = "none";
        flaglpm = 1;
        localStorage.setItem('disablelpmwindow', flaglpm)
      }
    }

    if (localStorage.getItem('disablelpmwindow') == 1) {
      document.getElementById('testUsers').style.display = "none";
      lpmboxstatus.checked = true;
    } else {
      lpmboxstatus.checked = false;
    }

    document.getElementById('setteststd').onclick = function () { // сохраняется ID в настройках расширения тестового ученика в localstorage
      if (document.getElementById('test_std').value != '') {
        localStorage.setItem('test_stud', document.getElementById('test_std').value);
      } else console.log("Ведите ID тестового ученика")
    }

    document.getElementById('settestteach').onclick = function () { // сохраняется ID в настройках расширения тестового учителя в localstorage
      if (document.getElementById('test_teach').value != '') {
        localStorage.setItem('test_teach', document.getElementById('test_teach').value);
      } else console.log("Ведите ID тестового преподавателя")
    }

    document.getElementById('savesettingstofile').onclick = function () {  // по клику на кнопку Сохранить настройки сохраянется на жесткомм диске файл с содержимым localstorage
      getLocalstorageToFile('settings-af')
    }

    document.getElementById('fileinput').onclick = function () { // по клику на кнопку Загрузить настройки предлагает выбрать файл настроек, добавлять при этом ранее сохраненный в формате .json
      let fileInput = document.getElementById('fileinput');
      let jsonparsed;

      fileInput.addEventListener('change', function (e) {
        let file = fileInput.files[0];
        let textType = /.json/;

        if (file.type.match(textType)) {
          let reader = new FileReader();

          reader.onload = function (e) {
            console.log(reader.result)
            jsonparsed = JSON.parse(reader.result)
            console.log(jsonparsed)
            console.log(Object.keys(jsonparsed).length)
            for (let i = 0; i < Object.keys(jsonparsed).length; i++) {
              localStorage.setItem(Object.keys(jsonparsed)[i], Object.values(jsonparsed)[i])
            }
            alert("Настройки расширения в localstorage загружены успешно!")
          }

          reader.readAsText(file);
        } else {
          console.log("File not supported!")
        }
      });
    }

    //Скрыть окно выбора языка
    let flaglng = 0;   // функция чекбокса вкл и откл  информационного окна
    var lngbtnonoff = document.getElementById('hidelngselector');
    lngbtnonoff.onclick = function () {

      if (!lngbtnonoff.checked) {
        document.getElementsByClassName('user_menu-language_switcher')[0].style.display = ''
        flaglng = 0;
        localStorage.setItem('disablelngpmwindow', flaglng)
      } else {   // поставить checked, если он не установлен
        document.getElementsByClassName('user_menu-language_switcher')[0].style.display = 'none'
        flaglng = 1;
        localStorage.setItem('disablelngpmwindow', flaglng)
      }
    }

    if (localStorage.getItem('disablelngpmwindow') == 1) {
      document.getElementsByClassName('user_menu-language_switcher')[0].style.display = 'none'
      lngbtnonoff.checked = true;
    } else {
      lngbtnonoff.checked = false;
    }

    if (localStorage.getItem('audio') == '0')
      document.getElementById('audioswitcher').checked = false;
    else
      document.getElementById('audioswitcher').checked = true;

    document.getElementsByClassName('checkbox-audio-switch')[0].onclick = function () {  // функция переключатели звука ВКЛ и ВЫКЛ

      if (localStorage.getItem('audio') != null) {
        if (localStorage.getItem('audio') == '0') {
          document.getElementById('audioswitcher').checked = false;
          localStorage.setItem('audio', '1');
        } else if (localStorage.getItem('audio') == '1') {
          document.getElementById('audioswitcher').checked = true;
          localStorage.setItem('audio', '0');
          if (soundintervalset != null) {
            clearInterval(soundintervalset)
            soundintervalset = null
          }
        }
      }
    }
  }
}

document.getElementById('hideMeSettings').onclick = function () {
  document.getElementById('AF_Settings').style.display = 'none'
}

// конец блока настроек

setInterval(paintstatus, 5000); //  вызов функции перекрашивания статуса в котором оператор находится