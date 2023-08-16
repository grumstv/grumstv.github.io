var win_testrooms =  // описание элементов окна создания тестовых комнат
  `<div style="display: flex; width: 260px;">
      <span style="width: 260px">
          <span style="cursor: -webkit-grab;">
              <div style="width: 260px; margin: 5px;" id="testroomshead">
                  <button title="скрывает меню" id="hideMetestrooms" class="buttonHide">hide</button>
                  <button onclick="cleartestroomsfields()" title="По нажатию очищает поля" style="width:24px;">🧹</button>
                  <button onclick="opentestroomshelp()" style="width:24px; float: right; margin-right: 10px;" title="Инструкция по этой форме">❓</button>
                  <button onclick="opentestroomsconf()" title="Открывает раздел в Confluence по созданию тестовых комнат" style="width:24px; float: right; margin-right: 5px;">📋</button>
              </div>

					    <div style="width: 260px; margin:5px; display:flex; justify-content:left;">
                  <select id="subjecttypeselect" style="text-align: center; width: 240px; height: 26px; color: black; margin-left: 7px; margin-top: 5px;">
                      <option disabled="" selected="" value="subjnotselect" style="background-color: orange; color: white;">Выбери предмет</option>
                      <option value="api-english">Английский</option>
                      <option value="api-preschool">Дошкольная математика</option>
                      <option value="api-computer-science">Компьютерные курсы</option>
                      <option value="api-math">Математика</option>
                      <option value="api-social-science">Обществознание</option>
                      <option value="api-russian">Русский язык</option>
                      <option value="api-physics">Физика</option>
                      <option value="api-chess">Шахматы</option>
                  </select>
              </div>

              <div style="width: 260px; margin:5px; display:flex; justify-content:left;">
                  <input id="teachforroom" placeholder="Введи ID П" title="Введи id П для кого создать тестовую комнату" oninput="onlyNumbers(this)" autocomplete="off" type="text" style="text-align: center; width: 120px; color: black; margin-left: 5px; margin-top: 5px;">
                  <input id="studforroom" placeholder="Введи ID У" title="Введи id У для кого создать тестовую комнату" oninput="onlyNumbers(this)" autocomplete="off" type="text" style="text-align: center; width: 120px; color: black; margin-left: 5px; margin-top: 5px;">
    					</div>

              <div style="width: 260px; margin:2px; display:flex; justify-content:left;">
                  <button id="insertteachid" title="Поставить id вашего тестового П" onclick="testteachertofield()" class="testroomsbtn" style="margin-left:5px;">Тест👽</button>
                  <button id="insertstudid" title="Поставить id вашего тестового У" onclick="teststudenttofield()" class="testroomsbtn">Тест👨&zwj;🎓</button>
                  <button id="userfromchatid" title="Подставить id пользователя из активного чата и подставить id вашего тестового У или П" class="testroomsbtn">ID из чата</button>
              </div>
              <div style="width: 260px; margin:5px; display:flex; justify-content:left;">
                  <button id="starttestroom" title="Тут и так понятно" class="testroomscreate">Создать тестовый урок</button>
              </div>
              <div style="width: 260px; margin:5px; display:flex; justify-content:left;">
              <label id="testroomsmessage" style="color:bisque; width:250px; text-align: center; border: 1px solid #3e4f55; background: rgb(70, 68, 81); border-radius: 10px; font-size: 15px; box-shadow: 0px 3px 1px rgb(0 0 0 / 35%); text-shadow: 1px 2px 5px rgb(0 0 0 / 55%);"></label>
              </div>
          </span>
      </span>
  </div>`;


if (localStorage.getItem('winToptestrooms') == null) { // началоное положение окна создания тестовых комнат
  localStorage.setItem('winToptestrooms', '120');
  localStorage.setItem('winLefttestrooms', '295');
}

let winttestrooms = document.createElement('div'); // создание окна создания тестовых комнат
document.body.append(winttestrooms);
winttestrooms.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winToptestrooms') + 'px; left: ' + localStorage.getItem('winLefttestrooms') + 'px; font-size: 14px; z-index: 21; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
winttestrooms.style.display = 'none';
winttestrooms.setAttribute('id', 'AF_testrooms');
winttestrooms.innerHTML = win_testrooms;

const messagefield = document.getElementById('testroomsmessage');
messagefield.display = 'none';


var listenertestrooms = function (e, a) { // сохранение позиции окна создания тестовых комнат
  winttestrooms.style.left = Number(e.clientX - myX7) + "px";
  winttestrooms.style.top = Number(e.clientY - myY7) + "px";
  localStorage.setItem('winToptestrooms', String(Number(e.clientY - myY7)));
  localStorage.setItem('winLefttestrooms', String(Number(e.clientX - myX7)));
};

winttestrooms.onmousedown = function (a) { // изменение позиции окна создания тестовых комнат
  if (checkelementtype(a)) {
    window.myX7 = a.layerX;
    window.myY7 = a.layerY;
    document.addEventListener('mousemove', listenertestrooms); 
  }
}
winttestrooms.onmouseup = function () { document.removeEventListener('mousemove', listenertestrooms); } // прекращение изменения позиции окна создания тестовых комнат

document.getElementById('testroomshead').ondblclick = function (a) { // скрытие окна создания тестовых комнат по двойному клику
  if (checkelementtype(a)) { document.getElementById('AF_testrooms').style.display = 'none'; }
}

document.getElementById('hideMetestrooms').onclick = function () { // скрытие окна создания тестовых комнат
  if (document.getElementById('AF_testrooms').style.display == '')
    document.getElementById('AF_testrooms').style.display = 'none'
}

let TestRoomsBtn = document.createElement('button') // добавление кнопки открытия окна создания тестовых комнат
TestRoomsBtn.textContent = '🎲'
TestRoomsBtn.id = "TestRooms"
TestRoomsBtn.classList = 'teststudteach'
TestRoomsBtn.title = "Открыть окно создания тестовых уроков"
TestRoomsinsert = document.getElementById('testUsers').childNodes[0].childNodes[1]
TestRoomsinsert.insertBefore(TestRoomsBtn, TestRoomsinsert.children[2])

document.getElementById('TestRooms').onclick = function () { //открывает окно создания тестовых комнат
    setDisplayStyle(document.getElementById('AF_testrooms'), document.getElementById('AF_testrooms').style.display === '' ? 'none' : '');
}

function cleartestroomsfields(){ // очистка полей окно создания тестовых комнат
  document.getElementById('teachforroom').value = '';
  document.getElementById('studforroom').value = '';
  document.getElementById('subjecttypeselect').children[0].selected = true
}

function testteachertofield(){ // подставить тестового П
  if (localStorage.getItem('test_teach') != '' && localStorage.getItem('test_teach') != null) {
    document.getElementById('teachforroom').value = localStorage.getItem('test_teach');
  } else {
    document.getElementById('teachforroom').placeholder = "Не указан ID П";
    testroomsshowmessage('error','В настройках расширения не указан id тестового преподавателя')
  }
}

function teststudenttofield(){ // подставить тестового У
  if (localStorage.getItem('test_stud') != '' && localStorage.getItem('test_stud') != null) {
    document.getElementById('studforroom').value = localStorage.getItem('test_stud');
  } else {
    document.getElementById('studforroom').placeholder = "Не указан ID У";
    testroomsshowmessage('error','В настройках расширения не указан id тестового ученика')
  }
}

document.getElementById('userfromchatid').onclick = function () { // добавить id пользователя из активного чата и добавить id тестовго У или П
  let userDetailsList = document.getElementsByClassName('expert-user_details-list')[1];
  if (userDetailsList){
      let insertionfield = ''
      let flagwhouser = '0'

      for (let i = 0; userDetailsList.childNodes[i]; i++) {
          const childNode = userDetailsList.childNodes[i];
          const textContent = childNode.childNodes[1].textContent;
          if (textContent === "teacher") {
              teststudenttofield()
              insertionfield = document.getElementById('teachforroom')
              flagwhouser = '1';
          } else if (textContent === "student") {
              testteachertofield()
              insertionfield = document.getElementById('studforroom')
              flagwhouser = '1';
          }
      }

      if (flagwhouser == '1'){
        for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
          if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "id")
            insertionfield.value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText.split(' ')[0];
        }
      } else {
        testroomsshowmessage('error','Не удается определить тип пользователя, пожалуйста, внесите id вручную')
      }
  } else {
    testroomsshowmessage('error','Нет выбранного чата')
  }
}

document.getElementById('starttestroom').onclick = function () { // добавляем тестовую комнату
    let randomHash = '';
    let flagemptyttfields = '0';
    let studentidforroom = '';
    let teacheridforroom = '';
    let lessonsubjecttype = '';
    let massagetexttoshow = '';

    if (document.getElementById('subjecttypeselect').value == 'subjnotselect') {
        flagemptyttfields = '1';
        massagetexttoshow = 'Не выбран предмет'
        console.log ('Не выбран предмет');
    } else { lessonsubjecttype = document.getElementById('subjecttypeselect').value }

    if ( document.getElementById('teachforroom').value.length <4){
        flagemptyttfields = '1';
        massagetexttoshow = 'Не указан id преподавателя'
        console.log ('Не указан id преподавателя');
    } else { teacheridforroom =  document.getElementById('teachforroom').value }

    if ( document.getElementById('studforroom').value.length <4){
        flagemptyttfields = '1';
        massagetexttoshow = 'Не указан id ученика'
        console.log ('Не указан id ученика');
    } else { studentidforroom =  document.getElementById('studforroom').value }

    if (flagemptyttfields === '0'){
      randomHash = GenerateHash(14);

      const requestBody = `${randomHash}%5Btype%5D=test&${randomHash}%5BteacherId%5D=${teacheridforroom}&${randomHash}%5BstudentIds%5D=${studentidforroom}&btn_create_and_list=`;
      const requestreferrer = `https://${lessonsubjecttype}.skyeng.ru/admin/tech-support-room/create`;
      const requestAdr = `https://${lessonsubjecttype}.skyeng.ru/admin/tech-support-room/create?uniqid=${randomHash}`;
      const requestHeaders = {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,ru;q=0.8",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
      };
      const request = {
          headers: requestHeaders,
          referrer: requestreferrer,
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: requestBody,
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
      };
  
      document.getElementById('responseTextarea1').value = JSON.stringify(request);
      document.getElementById('responseTextarea2').value = requestAdr;
      document.getElementById('responseTextarea3').value = 'postdata';
      document.getElementById('sendResponse').click();

      document.getElementById('responseTextarea1').addEventListener('DOMSubtreeModified', () => {
        let responseRoomCreate = document.getElementById('responseTextarea1').getAttribute('postdata');
        if (responseRoomCreate) {
          testroomsshowmessage('message','Тестовый урок создан, приглашение на него отображаются в личных кабинетах У и П');
          document.getElementById('responseTextarea1').removeAttribute('postdata');
          cleartestroomsfields()
        }
    });
    } else {
      testroomsshowmessage('error',massagetexttoshow);
    }        
}

function GenerateHash(length) { // генерируем случайный хэш
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function testroomsshowmessage(type,text){ // вывод уведомлений
    if (type == 'error'){
      messagefield.style.background = '#d5484f';
    } else if (type == 'message'){
      messagefield.style.background = '#46d17e';
    } else {
      console.log ('Получен неизвестный тип сообщения');
      messagefield.style.background = 'rgb(70, 68, 81)';
    }

    messagefield.innerText = text;
    messagefield.display = '';
    setTimeout(testroomshidemessage, 3000)
}

function testroomshidemessage(){ //скрытие уведомлений
    messagefield.display = 'none';
    messagefield.innerText = '';
    messagefield.style.background = 'rgb(70, 68, 81)';
}

function opentestroomsconf() { // Открывает раздел в Confluence по созданию тестовых комнат
  window.open("https://confluence.skyeng.tech/pages/viewpage.action?pageId=82244638")
}

function opentestroomshelp() { // Открывает раздел в Confluence по созданию тестовых комнат
  window.open("https://confluence.skyeng.tech/pages/viewpage.action?pageId=140564971#id-%F0%9F%A7%A9%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D0%B5ChatMasterAutoFaq-testrooms%D0%9E%D0%BA%D0%BD%D0%BE%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D1%85%D1%83%D1%80%D0%BE%D0%BA%D0%BE%D0%B2")
}
