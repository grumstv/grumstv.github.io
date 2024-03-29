var win_Links =  // описание элементов окна ссылок
    `<div style="display: flex; width: 550px;">
        <span style="width: 550px">
			<span style="cursor: -webkit-grab;">
				<div style="margin: 5px; width: 550;" id="links_1str">
					<button title="Скрытие меню" id="hideMe" style="width:50px; background: #228B22;">hide</button>
                    <button title="Открывает Базу знаний в Confluence" id="knoweledgebaseKC" class="uplinksbar onlyforkc">📚</button>
                    <button title="Прослушать запись урока" id="lessonrecordKC" class="uplinksbar onlyforkc">👩‍🏫</button>
					<button title="Личный кабинет в Skyeng" id="skyhomeKC" class="uplinksbar onlyforkc">💼</button>
				</div>
                <div style="margin: 5px; width: 550px;" id="links_butKC">
                    <button title="Открывает Timetable" id="timetableKC" style="width:105px">TimeTable</button>
                    <button title="Проведение операций с балансом ученика" id="CalcKC" style="width:105px">Калькулятор</button>
                    <button title="Проведение компенсаций, условия промокодов/сертиикатов" id="nachislyatorKC" style="width:105px">Начислятор</button>
                    <button title="Админка рассрочек" id="rassrochKC" style="width:105px">Рассрочка</button>
                    <button title="Админка подписок" id="pondpisKC" style="width:105px">Подписки</button>
                    <button title="Открывает Omnidesk" id="omniKC" style="width:105px">Omni</button>
                    <button title="Админка разговорных клубов" id="RKKC" style="width:105px">РК</button>
                    <button title="Актуальные шаблоны КЦ" id="shablKC" style="width:105px">Шаблоны</button>
                    <button title="Написать нарушение бизнес-процесса на менеджера" id="narushKC" style="width:105px">Нарушение БП</button>
                    <button title="Учет рабочего времени КЦ" id="grafKC" style="width:105px">График</button>
				</div>
			</span>
	</span>
</div>`;

if (localStorage.getItem('winTopLinks') == null) { // началоное положение окна ссылок (если не задано ранее)
    localStorage.setItem('winTopLinks', '120');
    localStorage.setItem('winLeftLinks', '295');
}

let wintLinks = document.createElement('div'); // создание окна ссылок
document.body.append(wintLinks);
wintLinks.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopLinks') + 'px; left: ' + localStorage.getItem('winLeftLinks') + 'px; font-size: 14px; z-index: 10000; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintLinks.style.display = 'none';
wintLinks.setAttribute('id', 'AF_Links');
wintLinks.innerHTML = win_Links;

wintLinks.onmousedown = function(event) {
  if (checkelementtype(event)) {
    let startX = event.clientX;
    let startY = event.clientY;
    let elemLeft = wintLinks.offsetLeft;
    let elemTop = wintLinks.offsetTop;

    function onMouseMove(event) {
		if (!(event.buttons & 1)) {
			onMouseUp();
			return;
		  }
      let deltaX = event.clientX - startX;
      let deltaY = event.clientY - startY;

      wintLinks.style.left = (elemLeft + deltaX) + "px";
      wintLinks.style.top = (elemTop + deltaY) + "px";

      localStorage.setItem('winTopLinks', String(elemTop + deltaY));
      localStorage.setItem('winLeftLinks', String(elemLeft + deltaX));
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mouseup', onMouseUp);
  }
};
 // прекращение изменения позиции окна ссылок

document.getElementById('AF_Links').ondblclick = function (a) { // скрытие окна ссылок по двойному клику
    if (checkelementtype(a)) { document.getElementById('AF_Links').style.display = 'none'; }
}

document.getElementById('links').onclick = function () { //открывает окно ссылок
    if (document.getElementById('AF_Links').style.display == '')
        document.getElementById('AF_Links').style.display = 'none'
    else {
        document.getElementById('AF_Links').style.display = ''
    }
}
	
document.getElementById('hideMe').onclick = function () { // скрытие окна ссылок
    if (document.getElementById('AF_Links').style.display == '')
        document.getElementById('AF_Links').style.display = 'none'
}

document.getElementById('knoweledgebaseKC').addEventListener('click', function () { // открытие Confluence Customer Service WIKI для КЦ
    window.open("https://confluence.skyeng.tech/display/CSW/Customer+Service+WIKI")
}) 

document.getElementById('lessonrecordKC').addEventListener('click', function () { // открытие записи уроков для КЦ
    window.open("https://tramway.skyeng.ru/record")
}) 

document.getElementById('skyhomeKC').addEventListener('click', function () { // открытие Skyeng Home для КЦ
    window.open("https://home.skyeng.ru/dashboard")
})

document.getElementById('timetableKC').addEventListener('click', function () { // открытие Timetable для КЦ
    window.open("https://timetable.skyeng.ru/")
})

document.getElementById('CalcKC').addEventListener('click', function () { // открытие Калькулятор для КЦ
    window.open("https://billing-api.skyeng.ru/operations")
})

document.getElementById('nachislyatorKC').addEventListener('click', function () { // открытие Начислятор для КЦ
    window.open("https://billing-marketing.skyeng.ru/accrual-operations/create")
})

document.getElementById('rassrochKC').addEventListener('click', function () { // открытие Рассрочки для КЦ
    window.open("https://accounting.skyeng.ru/credit/list")
})

document.getElementById('pondpisKC').addEventListener('click', function () { // открытие Подписки для КЦ
    window.open("https://billing-api.skyeng.ru/subscriptions")
})

document.getElementById('omniKC').addEventListener('click', function () { // открытие Omni для КЦ
    window.open("https://skyeng.omnidesk.ru/")
})

document.getElementById('RKKC').addEventListener('click', function () { // открытие админки РК для КЦ
    window.open("https://group.skyeng.ru/admin/?crudAction=index&crudControllerFqcn=App%5CController%5CAdmin%5CClubMemberCrudController&signature=V8w5PW8LT3GcoYMoSYzprG1lCW8F5sb5y7Bdrxh08pc")
})

document.getElementById('shablKC').addEventListener('click', function () { // открытие актуальных габлонов для КЦ
    window.open("https://docs.google.com/spreadsheets/d/14paTabjaJcRIvlpTQzdGePltiN0bsPaFjFEbn4DD3Ho/edit#gid=410124091")
})

document.getElementById('narushKC').addEventListener('click', function () { // открытие формы нарушений для КЦ
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSeAxtdad9yc5iLo-7v4rqMj5M2wdaJKOpzy5X_eWkHqHWY9sg/viewform")
})

document.getElementById('grafKC').addEventListener('click', function () { // открытие гркфика работы для КЦ
    window.open("https://docs.google.com/spreadsheets/d/1SiD1yfpzIEF8ZafVXnq0Z-hyF0b45aAQ8s6BWgy-s0c/edit#gid=1933422994")
})