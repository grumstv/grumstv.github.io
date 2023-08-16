var soundsconteinerCRM;
var soundintervalsetCRM = null
function mystyles() {
    let mstl = document.createElement('style');
    document.body.append(mstl);
    var style = `
	input {
		font-family:sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,NotoEmoji,Twemoji;
	}	
	textarea {
		font-family:sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,NotoEmoji,Twemoji;
	}
	span {
		font-family:sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,NotoEmoji,Twemoji;
	}
	.btnCRM {
		background-color:#768d87;
		border-radius:5px;
		border:1px solid #566963;
		color:#ffffff;
		padding:5px 5px;
		font-family:sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,NotoEmoji,Twemoji;
		font-size:14px;
		min-height: 30px;
	}
	.btnCRM:hover, #testuchenik:hover, #testprepod:hover {
		background: #6A5ACD;
	}
	.active-query {
		border-left:6px solid #1ff400;
		box-shadow: 0px 5px 5px rgb(0 0 0 / 55%);
		text-shadow: 1px 2px 5px rgb(0 0 0 / 55%);
		font-weight: 700;
		color: greenyellow;
		transition: all 1s ease;
	}
	#jirafinder {
		cursor: pointer;
		font-size: 14px;
		border: 1px solid black;
		padding: 6px;
	}
	#jirafinder:hover, #buttonUnsub:hover, #servDskCRM:hover, #smartroomformCRM:hover, #butLessonInfoCRM:hover, #butdiagtoolsCRM:hover, #btnOperStatus:hover, #btnAlarmclock:hover, #btnSettingsApp:hover  {
		background:DeepSkyBlue;
		color:#ffffffe6;
		font-weight:600;
		font-size:16px;
		box-shadow: 0px 3px 1px rgb(0 0 0 / 35%);
		text-shadow: 1px 2px 5px rgb(0 0 0 / 55%);
	}
	#buttonUnsub, #smartroomformCRM, #servDskCRM, #butLessonInfoCRM, #butdiagtoolsCRM, #btnOperStatus, #btnAlarmclock, #btnSettingsApp {
		cursor: pointer;
		font-size: 14px;
		padding: 6px;
		border-bottom: 1px solid black;
		border-left: 1px solid black;
		border-right: 1px solid black;
	}	
	
	#btnSettingsApp, #butdiagtoolsCRM {
		font-family:sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,NotoEmoji,Twemoji;
	}

	.radio {
		width:15px;
		height:15px;
		font-size:14px;
		transition: all 0.5s ease;
	}
	.radio:hover {
		transform: scale(1.5);
		font-weight: 600;
	}
	.sdcustfieldformlines {
        width: 420px;
    }
	.sdbtn{
		width: 90px;
		margin-top:2px;
		margin-left:2px;
	}
    .sdexpecactual {
        width: 420px;
    }
	.widthofsd {
		width:420px;
	}
	.activebtn {
		background-color: #1e90ff;
	}
	.activebtnsd {
		background-color: #ff6347;
	}
	.sugops {
		margin-left:5px;
		color:bisque;
		font-size: 16px;
		transition: all 0.5s ease;
	}
	.sugops:hover {
		font-size:18px;
		color: SteelBlue;
		font-weight: 600;
	}

	.catsmartroom {
		margin-left: 5px;
		color: bisque;
		font-size: 16px;
		transition: all 0.5s ease;
	}
	.catsmartroom:hover {
		font-size:18px;
		color: SteelBlue;
		font-weight: 600;
	}
	.checkbox-audio {
		display: inline-block;
		height: 28px;
		line-height: 28px;
		margin-right: 10px;
		position: relative;
		vertical-align: middle;
		font-size: 14px;
		user-select: none;
	}
	.checkbox-audio .checkbox-audio-switch-CRM {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		width: 56px;
		height: 28px;
		border: 1px solid rgba(0, 0, 0, .1);
		border-radius: 25%/50%;
		vertical-align: top;
		background: #eee;
		transition: .2s;
	}
	.checkbox-audio .checkbox-audio-switch-CRM:before {
		content: '🔈';
		position: absolute;
		top: 1px;
		left: 1px;
		display: inline-block;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
		transition: .15s;
	}
	.checkbox-audio input[type=checkbox] {
		display: block;
		width: 0;
		height: 0;
		position: absolute;
		z-index: -1;
		opacity: 0;
	}
	.checkbox-audio input[type=checkbox]:not(:disabled):active + .checkbox-audio-switch-CRM:before {
		box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);
	}
	.checkbox-audio input[type=checkbox]:checked + .checkbox-audio-switch-CRM {
		background: limegreen;
	}
	.checkbox-audio input[type=checkbox]:checked + .checkbox-audio-switch-CRM:before {
		content: '🔊';
		transform:translateX(28px);
	}

	#testuchenik {
		writing-mode: vertical-lr;
		text-orientation: upright;
		position: absolute;
		top: 0;
		Left: -34px;
		font-size: 20px;
		padding: 5px;
		color: bisque;
		background: #547354;
		min-height: 60px;
		text-align: center;
		border: 1px solid black;
		box-shadow: 0px 3px 1px rgb(0 0 0 / 35%);
		text-shadow: 1px 2px 5px rgb(0 0 0 / 55%);
		user-select: none;
		cursor: pointer;
	}
	#testuchenik.active, #testprepod.active  {
		background: coral;
	}
	
	#testprepod {
		writing-mode: vertical-lr;
		text-orientation: upright;
		position: absolute;
		top: 0;
		right: -34px;
		font-size: 20px;
		padding: 5px;
		color: bisque;
		background: #547354;
		min-height: 60px;
		text-align: center;
		border: 1px solid black;
		box-shadow: 0px 3px 1px rgb(0 0 0 / 35%);
		text-shadow: 1px 2px 5px rgb(0 0 0 / 55%);
		user-select: none;
		cursor: pointer;
	}	
`
    mstl.innerHTML = style;
}

mystyles()

function addOptionCRM(oListboxCRM, text, value) {  //функция добавления опции в список
    var oOptionCRM = document.createElement("option");
    oOptionCRM.appendChild(document.createTextNode(text));
    oOptionCRM.setAttribute("value", value);
    oListboxCRM.appendChild(oOptionCRM);
}

// start
const copyToClipboardCRM = strznach => { // функция копирования в буфер обмена
    const elik = document.createElement('textarea');
    elik.value = strznach;
    document.body.appendChild(elik);
    elik.select();
    document.execCommand('copy');
    document.body.removeChild(elik);
};
// end

// start logginer func
let tokenlogCRM;
let logginerinfoCRM;
function logginerfortestsCRM(polzovatel) {
    document.getElementById('responseTextarea1').value = `{
			  "headers": {
				"content-type": "application/x-www-form-urlencoded",
				"sec-fetch-site": "same-origin",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1"
			  },
			  "referrer": "https://id.skyeng.ru/admin/auth/login-links",
			  "referrerPolicy": "strict-origin-when-cross-origin",
			  "body": "login_link_form%5Bidentity%5D=&login_link_form%5Bid%5D=${polzovatel}&login_link_form%5Btarget%5D=https%3A%2F%2Fskyeng.ru&login_link_form%5Bpromocode%5D=&login_link_form%5Blifetime%5D=3600&login_link_form%5Bcreate%5D=&login_link_form%5B_token%5D=${tokenlogCRM}",
			  "method": "POST",
			  "mode": "cors",
			  "credentials": "include"
			}`
    document.getElementById('responseTextarea2').value = "https://id.skyeng.ru/admin/auth/login-links";
    document.getElementById('responseTextarea3').value = 'senddata1'
    document.getElementById('sendResponse').click()

    document.getElementById("responseTextarea1").addEventListener("DOMSubtreeModified", function () {
        logginerinfoCRM = document.getElementById('responseTextarea1').getAttribute('senddata1');
        if (logginerinfoCRM != null) {
            logginerinfoCRM = logginerinfoCRM.match(/("https:\/\/id.skyeng.ru\/auth\/login-link\/\w+.*?")/gm);
            logginerinfoCRM = logginerinfoCRM[logginerinfoCRM.length - 1].split("\"");
            copyToClipboardCRM(logginerinfoCRM[1])
            document.getElementById('responseTextarea1').removeAttribute('senddata1')
        }
    })
}

//end

function checkelementtype(a) { // проверка на какой элемент нажали
    let elem = document.elementFromPoint(a.clientX, a.clientY)

    if (elem.nodeName != 'BUTTON' && elem.nodeName != 'INPUT' && elem.nodeName != 'TEXTAREA' && elem.nodeName != 'SELECT' && elem.className != "checkbox-audio-switch-CRM") {
        return true;
    }
    return false;
}

function maxLengthCheck(object) // функция ограничения кол-ва символов в полях
{
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

function onlyNumbers(object) { // функция для разрешения ввода только цифр
    object.value = object.value.replace(/[^0-9]/g, '');
}

function include(url) {
    var script = document.createElement('script');
    script.src = url;
	script.setAttribute('defer', '')
    document.getElementsByTagName('head')[0].appendChild(script);
}	

if (localStorage.getItem('scriptAdrAppVers') == null) {
    localStorage.setItem('scriptAdrAppVers', 'https://script.google.com/macros/s/AKfycbwgym7WoXavCcMa7mpzlA4GHGncpWixKwyxhSJT1TU8tZg4KmRemyZqyQ3c5G2cKTxDrQ/exec');
}

let appverresult;
let tableres;
function getText() { // обьявление функции получающей текст из гугл таблицы страницы Версии приложений
    var app = localStorage.getItem('scriptAdrAppVers'),
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        if (xhr.status == 200) {
            try {
                var r = JSON.parse(xhr.responseText),
                    appverresult = r["result"];

                tableres = appverresult;
                console.log('Версии приложений получены')

            } catch (e) { console.log(e) }
        }
    }
    xhr.send()
}


include("https://code.jquery.com/jquery-3.6.0.js") // подключаем модуль обработки JQuery
include("https://dimentorexpo.github.io/ModulesCRM/JiraSearch.js")
// include("https://dimentorexpo.github.io/ModulesCRM/unsub.js")
//Объявление кнопки в верхней панели CRM
let upmenubtn = document.createElement('span')
upmenubtn.innerText = "Меню"
upmenubtn.id = 'MenubarCRM'
upmenubtn.style="cursor:pointer;font-weight:500; text-shadow: 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000; border: 1px solid black; padding: 8px; background: #5083ff; border-radius:18px"
//конец обьявления кнопки

function initialize() { //функция инициализации кнопки меню в верхней области CRM
try {
	if (location.origin == 'https://crm2.skyeng.ru')
		if (document.getElementsByClassName('mat-toolbar-row')[0] != undefined && document.getElementById('MenubarCRM') == null) {
			document.getElementsByClassName('mat-toolbar-row')[0].children[1].children[0].append(upmenubtn)

			document.getElementById('MenubarCRM').onclick = function() {
				if (document.getElementById('idmymenucrm').style.display == 'none')  {
					document.getElementById('idmymenucrm').style.display =''
					let xvarmenu = parseInt(document.getElementById('MenubarCRM').getBoundingClientRect().x - 21)
					menubarcrm.style.left = xvarmenu + 'px';
					let hghtelem = document.getElementById("idmymenucrm").offsetHeight - 12
					document.getElementById("testuchenik").style = "height:" + hghtelem + "px";
					document.getElementById("testprepod").style = "height:" + hghtelem + "px";
				} else {
					document.getElementById('idmymenucrm').style.display ='none'

				}
			}
			
			clearInterval(init)
		}
} 
catch (e) { console.error(e, e.stack); }
}

var init = setInterval(initialize, 3000) //заносим в переменную чтобы ее потом в функции можно было удалить интервал

getText() //вызов функции получающей текст из гугл таблицы страницы Версии приложений

let menubarcrm = document.createElement('div')
menubarcrm.style = `background: white; position:absolute; left: 950px; top: 50px; border: 0px solid #000000; display:none; min-height: 60px; min-width:170px; box-shadow: -1px 4px 16px 7px rgba(34, 60, 80, 0.09); z-index:999;`
menubarcrm.id = 'idmymenucrm'

document.body.append(menubarcrm)

if (document.querySelector('crm-container') != null) {
	document.querySelector('crm-container').addEventListener('click', function (event) {
		var e = document.getElementById('idmymenucrm');
		if (!e.contains(event.target)) e.style.display = 'none';
	});
}

//Обьявление кнопки открытия меню поиска по Jira
let jirasearchbtn = document.createElement('div')
jirasearchbtn.innerText = "🔎Jira search"
jirasearchbtn.id = "jirafinder"
document.getElementById('idmymenucrm').append(jirasearchbtn)
//конец обьявления

let buttonOpenForm = document.createElement('div'); //unsub
buttonOpenForm.id = 'buttonUnsub';
buttonOpenForm.textContent = "📧Unsub";
document.getElementById('idmymenucrm').append(buttonOpenForm)

include("https://dimentorexpo.github.io/ModulesCRM/unsub.js")

let butsmartroomCRM = document.createElement('div') // smartroom sugest
butsmartroomCRM.id = "smartroomformCRM"
butsmartroomCRM.innerHTML = "🦐Smartroom"

document.getElementById('idmymenucrm').append(butsmartroomCRM)

include("https://dimentorexpo.github.io/ModulesCRM/Smartroom.js")


let servDskCRM = document.createElement('div') //service desk
servDskCRM.id = "servDskCRM"
servDskCRM.innerHTML = "🥏ServiceDesk"

document.getElementById('idmymenucrm').append(servDskCRM)

include("https://dimentorexpo.github.io/ModulesCRM/ServiceDesk.js")

let butLessonInfoCRM = document.createElement('div')
butLessonInfoCRM.id = "butLessonInfoCRM"
butLessonInfoCRM.innerHTML = "🎓 Lesson Info"

document.getElementById('idmymenucrm').append(butLessonInfoCRM)

include("https://dimentorexpo.github.io/ModulesCRM/LessonStatus.js")

let butdiagtoolsCRM = document.createElement('div')
butdiagtoolsCRM.id = "butdiagtoolsCRM"
butdiagtoolsCRM.innerHTML = "🛠 Diagnostic tools"

document.getElementById('idmymenucrm').append(butdiagtoolsCRM)

include("https://dimentorexpo.github.io/ModulesCRM/Linksdostup.js")

let butOperStatus = document.createElement('div')
butOperStatus.id = "btnOperStatus"
butOperStatus.innerHTML = "🕵️‍♀️ OperStatus"

document.getElementById('idmymenucrm').append(butOperStatus)

include("https://dimentorexpo.github.io/ModulesCRM/OperatorStatuse.js")

let butAlarmclock = document.createElement('div')
butAlarmclock.id = "btnAlarmclock"
butAlarmclock.innerHTML = "🔕Reminder"

document.getElementById('idmymenucrm').append(butAlarmclock)

include("https://dimentorexpo.github.io/ModulesCRM/AlarmClock.js")

let butSettingsApp = document.createElement('div')
butSettingsApp.id = "btnSettingsApp"
butSettingsApp.innerHTML = "⚙ Settings"

document.getElementById('idmymenucrm').append(butSettingsApp)

include("https://dimentorexpo.github.io/ModulesCRM/SettingsApp.js")

let teststudent = document.createElement('span')
teststudent.textContent = "Тест У"
teststudent.id = "testuchenik"

document.getElementById('idmymenucrm').append(teststudent)

teststudent.onclick = function () {
	document.getElementById('testuchenik').classList.add('active')
	logginerfortestsCRM(localStorage.getItem('test_studCRM'))
        setTimeout(function () { document.getElementById('testuchenik').classList.remove('active') }, 1000)
}

let testteacher = document.createElement('span')
testteacher.textContent = "Тест П"
testteacher.id = "testprepod"

document.getElementById('idmymenucrm').append(testteacher)

testteacher.onclick = function () {
	document.getElementById('testprepod').classList.add('active')
	logginerfortestsCRM(localStorage.getItem('test_teachCRM'))
        setTimeout(function () { document.getElementById('testprepod').classList.remove('active') }, 1000)
}

let lboxstyles = document.createElement('link')
lboxstyles.rel = 'stylesheet'
lboxstyles.href = "https://dimentorexpo.github.io/Lightbox/dist/css/lightbox.min.css" // подключаем модуль стилей для Lightbox
document.querySelector('head').append(lboxstyles)

include("https://dimentorexpo.github.io/Lightbox/dist/js/lightbox.min.js") // подключаем библиотеку обработки изображений при клике на них

    function screenshotsCRM() { //просмотр и трансформация скриншотов в активном чате
	if (document.getElementsByTagName('crm-row').length != 0 || document.getElementsByTagName('crm-row') != null || document.getElementsByTagName('crm-row').length != undefined) {
		for (let i =0; i < document.getElementsByTagName('crm-row').length; i++) {
		if (document.getElementsByTagName('crm-row')[i].children.length != 0 && document.getElementsByTagName('crm-row')[i].children[0].innerText == 'Комментарий') {
			var divimg = document.getElementsByTagName('crm-row')[i]
			for (let j = 0; j < divimg.querySelectorAll('a').length; j++) {
				if (divimg.querySelectorAll('a')[j].host == 'vimbox-resource-chat-prod.imgix.net' || divimg.querySelectorAll('a')[j].host == 'vimbox-resource-storage-prod-ru-1.storage.yandexcloud.net' || divimg.querySelectorAll('a')[j].host == 'math-prod.storage.yandexcloud.net' || divimg.querySelectorAll('a')[j].host == 'i.imgur.com' || divimg.querySelectorAll('a')[j].host == 'joxi.ru' || divimg.querySelectorAll('a')[j].host == 'skr.sh' && divimg.querySelectorAll('a')[j].hasAttribute('data-lightbox') == false) {
					var img = document.createElement('img')
					img.style.width = '100px'
					var alink = document.createElement('a')
					alink.setAttribute('data-lightbox', 'imgs');
					alink.append(img)
					img.src = divimg.querySelectorAll('a')[j].href
					img.alt = 'Изображение'
					alink.href = img.src;
					divimg.querySelectorAll('a')[j].replaceWith(alink)
					}
				}
				
				
			}
		}
	}
}
let takeTaskBtn;
function checkforsoundplay() {
	takeTaskBtn = document.getElementsByClassName('mat-button-wrapper');
    if (localStorage.getItem('audioCRM') == 1 && window.location.href.indexOf('https://crm2.skyeng.ru/customer-support/start') !== -1) {
        if (takeTaskBtn.length > 0) {
            if (document.getElementsByClassName('mat-button-disabled').length == 0 && takeTaskBtn[13] && takeTaskBtn[13].innerText == 'Взять новую задачу') {
                if (localStorage.getItem('repeatsound') == 0) {
					// soundintervalsetCRM = '';
                    if (!soundintervalsetCRM) {
						audioCRM.play();
						soundintervalsetCRM = true
                    }
                } else {
                    if (!soundintervalsetCRM) {
                        audioCRM.oncanplaythrough = (event) => {
                            var playedPromise = audioCRM.play();
                            if (playedPromise) {
                                playedPromise.catch((e) => {
                                    console.log(e)
                                    if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
                                        console.log(e.name);
                                    }
                                }).then(() => {
                                    console.log("playing sound repeatedly !!!");
                                });
                            }
                        }
                        soundintervalsetCRM = setInterval(() => { audioCRM.play() }, localStorage.getItem('splinterCRM') * 1000)
                    }
                }

            } else {
                if (soundintervalsetCRM != null || soundintervalsetCRM != true) {
                    clearInterval(soundintervalsetCRM)
                    soundintervalsetCRM = null
                }
                if (soundintervalsetCRM == true) { soundintervalsetCRM = null }
            }
		}
        } else {
            if (soundintervalsetCRM != null || soundintervalsetCRM != true) {
                clearInterval(soundintervalsetCRM)
                soundintervalsetCRM = null
            }
			
            if (soundintervalsetCRM == true) {
				soundintervalsetCRM = null
				}
        }
}

setInterval(checkforsoundplay, 1000);

    screenshotsCRM()
    setInterval(screenshotsCRM, 5000)