var win_LessonStatus =  // описание элементов окна статуса уроков
    `<div style="display: flex; width: 550px;">
        <span style="width: 550px">
                <span style="cursor: -webkit-grab;">
                        <div style="margin: 5px; width: 550px;" id="lessomstatdata">
                                <button id="hideMeLessonStatus" style="width:50px; background: #228B22;">hide</button>
                        </div>
						 <div style="margin: 5px; width: 550px" id="databox">
								 <span style="color:bisque; float:center; margin-top:5px; margin-left:10px;">Начальная дата <input type="date" style="color:black; margin-left:20px;  width:125px;" name="StartDataLS" id="dateFromLS"></span>
								 <span style="color:bisque; margin-top:2px; float:right; margin-right:10px; height:28px;">Конечная дата <input type="date" style="color:black; float:right; margin-left:20px; margin-right:10px; width:125px;" name="EndDataLS" id="dateToLS"</span>
                        </div>
						<div>
							<input id="idteacherforsearch" placeholder="Teacher ID" title="Введите ID учителя, чтобы проверить информацию по урокам" autocomplete="off" type="text" style="position:relative; left:33%; text-align: center; width: 100px; color: black;margin-left:5px"">
							<input id="idstudentforsearch" placeholder="Student ID" title="Введите ID ученика, чтобы отфильтровать поиск" autocomplete="off" type="text" style="position:relative; left:32%; text-align: center; width: 100px; color: black;margin-left:5px"">
						</div>
						<div style="position:relative; left:30%; margin-top:5px; margin-bottom:5px;">
							 <button title="Запускает процесс поиска информации по статусам урока (отменен, перенесен, удален)" id="startlookstatus">Получить инфо об уроках</button>
							 <button title="Очищает поле от полученной инфы" id="clearlessonstatus">Очистить</button>
					    </div>
				</span>
						<div>
							<p id="statustable" style="margin-top:5px; max-height:400px; overflow:auto; display:none; color:bisque; text-align:center"></p>
						</div>
        </span>
</div>`;

if (localStorage.getItem('winTopLessonStatus') == null) { // начальное положение окна проверки статуса урока удален перенесен и кем
    localStorage.setItem('winTopLessonStatus', '120');
    localStorage.setItem('winLeftLessonStatus', '295');
}

let wintLessonStatus = document.createElement('div'); // создание окна статус урока
document.body.append(wintLessonStatus);
wintLessonStatus.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopLessonStatus') + 'px; left: ' + localStorage.getItem('winLeftLessonStatus') + 'px; font-size: 14px; z-index: 10000; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintLessonStatus.style.display = 'none';
wintLessonStatus.setAttribute('id', 'AF_LessonStatus');
wintLessonStatus.innerHTML = win_LessonStatus;

var listenerLessonStatus = function (e, a) { // сохранение позиции окна статус урока
    wintLessonStatus.style.left = Number(e.clientX - myX8) + "px";
    wintLessonStatus.style.top = Number(e.clientY - myY8) + "px";
    localStorage.setItem('winTopLessonStatus', String(Number(e.clientY - myY8)));
    localStorage.setItem('winLeftLessonStatus', String(Number(e.clientX - myX8)));
};

wintLessonStatus.onmousedown = function (a) { // изменение позиции окна статус урока
    if (checkelementtype(a)) {
        window.myX8 = a.layerX;
        window.myY8 = a.layerY;
        document.addEventListener('mousemove', listenerLessonStatus);
    }
}
wintLessonStatus.onmouseup = function () { document.removeEventListener('mousemove', listenerLessonStatus); } // прекращение изменения позиции окна


document.getElementById('AF_LessonStatus').ondblclick = function (a) { // скрытие окна статус урока по двойному клику
    if (checkelementtype(a)) { document.getElementById('AF_LessonStatus').style.display = 'none'; }
}

document.getElementById('hideMeLessonStatus').onclick = function () { // скрытие окна статус урока
        if (document.getElementById('AF_LessonStatus').style.display == '') {
            document.getElementById('AF_LessonStatus').style.display = 'none'
            document.getElementById('statustable').innerText = "";
        }
}

function renewdate() { // функция обновления даты
	// get current date
	const now = new Date();

	// get current year, month and day
	const curYear = now.getFullYear();
	const curMonth = String(now.getMonth() + 1).padStart(2, "0");
	const curDay = String(now.getDate()).padStart(2, "0");

	// calculate previous day
	const prevDate = new Date(now);
	prevDate.setDate(prevDate.getDate() - 1);
	const prevYear = prevDate.getFullYear();
	const prevMonth = String(prevDate.getMonth() + 1).padStart(2, "0");
	const prevDay = String(prevDate.getDate()).padStart(2, "0");

	// set date values in form inputs
	document.getElementById("dateFromLS").value = `${prevYear}-${prevMonth}-${prevDay}`;
	document.getElementById("dateToLS").value = `${curYear}-${curMonth}-${curDay}`;

  document.getElementById('statustable').innerText = "";
  document.getElementById('idteacherforsearch').value = "";
  document.getElementById('idstudentforsearch').value = "";
}

document.getElementById('clearlessonstatus').onclick = function () { // очистить поля проверки статуса урока
  if (!confirm("Are you sure you want to clear?")) {
    console.log("Canceled!");
    return;
  }
	renewdate()
};

document.getElementById('butLessonInfo').onclick = function () {
	renewdate()

	if (document.getElementById('AF_LessonStatus').style.display == '') {
		document.getElementById('AF_LessonStatus').style.display = 'none'
		document.getElementById('idmymenu').style.display = 'none'
		document.getElementById('MainMenuBtn').classList.remove('activeScriptBtn')
	} else {
		document.getElementById('AF_LessonStatus').style.display = ''
		document.getElementById('idmymenu').style.display = 'none'
		document.getElementById('MainMenuBtn').classList.remove('activeScriptBtn')
	}
}
	
//Функция проверки статусов урока

document.getElementById('startlookstatus').onclick = function () { //Функция проверки статусов урока
    if (document.getElementById('idteacherforsearch').value != "") {
        document.querySelector('#statustable').style.display = "";
        document.querySelector('#statustable').innerText = "Загрузка. Если информация не появилась нажмите повторно на кнопку получить инфа";
		let time_t = new Date();
		let ticherid = document.getElementById('idteacherforsearch').value.trim();
		let startdate = document.querySelector('#dateFromLS').value;
		startdate = startdate.split('-');
		startdate = `${startdate[2]}-${startdate[1]}-${startdate[0]} 21`;
		console.log(`start date= ${startdate}`);
		let enddate = document.querySelector('#dateToLS').value;
		enddate = enddate.split('-');
		enddate = `${enddate[2]}-${enddate[1]}-${enddate[0]} 21`;
		console.log(`end date= ${enddate}`);

        document.getElementById('responseTextarea1').value = `{
		  "headers": {
			"content-type": "application/x-www-form-urlencoded",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin"
		  },
		  "referrer": "https://timetable.skyeng.ru/",
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": "from=${startdate}:00:00&to=${enddate}:00:00&offset=0&filters[teacherIds][]=${ticherid}&callback=getJSONP",
		  "method": "POST",
		  "mode": "cors",
		  "credentials": "include"
		}`
        document.getElementById('responseTextarea2').value = "https://timetable.skyeng.ru/api/teachers/search";
        document.getElementById('responseTextarea3').value = 'getlessonstatusinfos'
        document.getElementById('sendResponse').click()
	
        document.getElementById("responseTextarea1").addEventListener("DOMSubtreeModified", function () {
            const arregetted = document.getElementById('responseTextarea1').getAttribute('getlessonstatusinfos');
            if (arregetted) {
				    const parsed = JSON.parse(arregetted);
                if (parsed && parsed[0].result[0].classes) {
                    document.querySelector('#statustable').innerText = "";
                    for (let i = 0; i < parsed[0].result[0].classes.length; i++) {
                        if (parsed[0].result[0].classes[i].studentId == document.getElementById('idstudentforsearch').value.trim()) {

                            let text = '💠 У: ' + parsed[0].result[0].classes[i].studentId + ' | 📆 ' + new Date(parsed[0].result[0].classes[i].startAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' }).slice(0, 17)

                            if (parsed[0].result[0].classes[i].classStatus !== undefined) {
                                parsed[0].result[0].classes[i].classStatus.createdByUserId == document.getElementById('idteacherforsearch').value ? parsed[0].result[0].classes[i].classStatus.createdByUserId = parsed[0].result[0].classes[i].classStatus.createdByUserId + ' (П)👽' : parsed[0].result[0].classes[i].classStatus.createdByUserId = parsed[0].result[0].classes[i].classStatus.createdByUserId

                                text = text + ' | услуга: ' + parsed[0].result[0].classes[i].educationServiceId;
                                text = text + ' | статус: ' + parsed[0].result[0].classes[i].classStatus.status;
                                text = text + ' | 📅 когда выставлен: ' + new Date(parsed[0].result[0].classes[i].classStatus.createdAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' });
                                text = text + ' | кем ❓: ' + parsed[0].result[0].classes[i].classStatus.createdByUserId;
                                text = text + ' | тип: ' + parsed[0].result[0].classes[i].type;
                                if (parsed[0].result[0].classes[i].classStatus.comment !== '') {
                                    text = text + ' | комментарий: ' + parsed[0].result[0].classes[i].classStatus.comment;
                                }
                            } else if (parsed[0].result[0].classes[i].removedAt) {

                                parsed[0].result[0].classes[i].createdByUserId == document.getElementById('idteacherforsearch').value ? parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId + ' (П)👽' : parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId

                                parsed[0].result[0].classes[i].createdByUserId == parsed[0].result[0].classes[i].studentId ? parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].studentId + ' (У)👨‍🎓' : parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId


                                text = text + ' | ❌ удален (проверить CRM на отпуск или удаление оператором): ' + parsed[0].result[0].classes[i].createdByUserId
                                text = text + ' | 📅 дата удаления: ' + new Date(parsed[0].result[0].classes[i].removedAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' });
                            }

                            let tempor = document.createElement('textarea');
                            document.getElementById('statustable').append(tempor);
                            tempor.setAttribute('style', 'width: 99.4%; height: 20px; color: bisque; font-weight:500; background-color:#464451;border-style:double; font-size:13px; height:48px;');
                            tempor.setAttribute('wrap', 'soft');
                            tempor.value = text;
                            //    console.log(text);
                        } else if (document.getElementById('idstudentforsearch').value == "") {
                            let text = '💠 У: ' + parsed[0].result[0].classes[i].studentId + ' | 📆 ' + new Date(parsed[0].result[0].classes[i].startAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' }).slice(0, 17)

                            if (parsed[0].result[0].classes[i].classStatus !== undefined) {
                                parsed[0].result[0].classes[i].classStatus.createdByUserId == document.getElementById('idteacherforsearch').value ? parsed[0].result[0].classes[i].classStatus.createdByUserId = parsed[0].result[0].classes[i].classStatus.createdByUserId + ' (П)👽' : parsed[0].result[0].classes[i].classStatus.createdByUserId = parsed[0].result[0].classes[i].classStatus.createdByUserId
                                text = text + ' | услуга: ' + parsed[0].result[0].classes[i].educationServiceId;
                                text = text + ' | статус: ' + parsed[0].result[0].classes[i].classStatus.status;
                                text = text + ' | 📅 когда выставлен: ' + new Date(parsed[0].result[0].classes[i].classStatus.createdAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' });
                                text = text + ' | кем ❓: ' + parsed[0].result[0].classes[i].classStatus.createdByUserId;
                                text = text + ' | тип: ' + parsed[0].result[0].classes[i].type;
                                if (parsed[0].result[0].classes[i].classStatus.comment !== '') {
                                    text = text + ' | комментарий: ' + parsed[0].result[0].classes[i].classStatus.comment;
                                }
                            } else if (parsed[0].result[0].classes[i].removedAt) {

                                parsed[0].result[0].classes[i].createdByUserId == document.getElementById('idteacherforsearch').value ? parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId + ' (П)👽' : parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId

                                parsed[0].result[0].classes[i].createdByUserId == parsed[0].result[0].classes[i].studentId ? parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].studentId + ' (У)👨‍🎓' : parsed[0].result[0].classes[i].createdByUserId = parsed[0].result[0].classes[i].createdByUserId

                                text = text + ' | ❌ удален (проверить CRM на отпуск или удаление оператором): ' + parsed[0].result[0].classes[i].createdByUserId
                                text = text + ' | 📅 дата удаления: ' + new Date(parsed[0].result[0].classes[i].removedAt).toLocaleString("ru-RU", { timeZone: 'Europe/Moscow' });
                            }

                            let tempor = document.createElement('textarea');
                            document.getElementById('statustable').append(tempor);
                            // tempor.setAttribute('type', 'text');
                            tempor.setAttribute('style', 'width: 99.4%; height: 20px; color: bisque; font-weight:500; background-color:#464451;border-style:double; font-size:13px; height:48px;');
                            tempor.setAttribute('wrap', 'soft');
                            tempor.value = text;
                        }
                    }
                } else {
                    alert("Уроков нет");
                }

                document.getElementById('responseTextarea1').removeAttribute('getlessonstatusinfos');
            }
        })

    } else {
        alert("Введите ID учителя в поле");
    }
}