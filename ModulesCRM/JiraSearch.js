var win_Jira =  // описание элементов окна Поиска по Jira
    `<div style="display: flex; width: 550px;">
        <span style="width: 550px">
                <span style="cursor: -webkit-grab;">
                        <div style="margin: 5px; width: 550;" id="jira_1str">
                                <button class="btnCRM" title="скрывает меню" id="hideMej" style="width:50px; background: #228B22;">hide</button>
								<button class="btnCRM" id="RefreshJiraStatus" title="Обновляет статус Токена Jira, чтобы проверить авторизованы вы или нет">🔄</button>
								<button class="btnCRM" id="ClearJiraData" title="Очищает поля с результатами и полем для ввода">🧹</button>
								<span style="color:bisque">Token Status: </span>
								<span id="searchjiratknstatus"></span>
								<button class="btnCRM" id="jirainstr" style="float:right;" title="Инструкция по этой форме">❓</button>
                        </div>

						<div id="control_jira_search">
							<button id="defaultQuery" title="Страница для поиска по умолчанию с заранее записанным JQL запросом" class="btnCRM active-query" style="margin-left: 17%;">📇Default</button>
							<button class="btnCRM" id="freshQuery" title="Страница при поиске по ключевому слову, выводящая свежесозданные баги в порядке убывания и с 0 Support Tab с заранее записанным JQL запросом">🍀Fresh</button>
							<button class="btnCRM" id="customQuery" title="Страница для ручного составления JQL запроса. Поле для ввода поиска не используется, только лишь верхняя часть от выбора отдела до ввода искомого текста в двойных кавычках после надписи text~">📝Custom</button>
							<button class="btnCRM" id="getiosbugs" title="По клику сразу ищет баги по iOS как если бы выискали стандартно с вводом текста поиска iOS">🍏iOS</button>
							<button class="btnCRM" id="getandroidbugs" title="По клику сразу ищет баги по iOS как если бы выискали стандартно с вводом текста поиска Android">🤖Android</button>
							<button class="btnCRM" id="favouriteBugs" title="Страница с сохраненными багами для быстрого доступа">❤</button>
							<textarea id="JQLquery" placeholder="JQL запрос" title="Введите сюда JQL запрос" autocomplete="off" type="text" style="text-align: center; width: 500px; color: black; margin-top: 5px; margin-left: 5%;"></textarea>
							<input id="testJira" placeholder="Введите слово или фразу для поиска" title="введите слово или фразу для поиска по Jira при одном клике будет искать по багам, если ввести в поле номер задачи например VIM-7288 и дабл кликнуть на рокету будет поиск по номеру" autocomplete="off" type="text" style="text-align: center; width: 300px; color: black; margin-top: 5px; margin-left: 20%;">
							<button class="btnCRM" id="getJiraTasks" style="width: 30px;">🚀</button>
						</div>

                        <div style="margin: 5px; width: 550px" id="jira_tasks_box">
                                <p id="issuetable" style="max-height:400px; margin-left:5px; overflow:auto"></p>
                                <p id="favouriteissuetable" style="max-height:400px; margin-left:5px; overflow:auto; display:none"></p>
                        </div>
                </span>
        </span>
</div>`;

if (localStorage.getItem('winTopJira') == null) { // началоное положение окна поиска по Jira (если не задано ранее)
    localStorage.setItem('winTopJira', '120');
    localStorage.setItem('winLeftJira', '295');
}

let wintJira = document.createElement('div'); // создание окна поиска по Jira
document.body.append(wintJira);
wintJira.style = 'min-height: 25px; min-width: 65px; background: #464451; top: ' + localStorage.getItem('winTopJira') + 'px; left: ' + localStorage.getItem('winLeftJira') + 'px; font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56); color: black;';
wintJira.style.display = 'none';
wintJira.setAttribute('id', 'AF_Jira');
wintJira.innerHTML = win_Jira;

var listenerJira = function (e, a) { // сохранение позиции окна поиска по Jira
    wintJira.style.left = Number(e.clientX - myX5) + "px";
    wintJira.style.top = Number(e.clientY - myY5) + "px";
    localStorage.setItem('winTopJira', String(Number(e.clientY - myY5)));
    localStorage.setItem('winLeftJira', String(Number(e.clientX - myX5)));
};

wintJira.onmousedown = function (a) { // изменение позиции окна поиска по Jira
    if (checkelementtype(a)) {
        window.myX5 = a.layerX;
        window.myY5 = a.layerY;
        document.addEventListener('mousemove', listenerJira);
    }
}
wintJira.onmouseup = function () { document.removeEventListener('mousemove', listenerJira); } // прекращение изменения позиции окна поиска по Jira

document.getElementById('AF_Jira').ondblclick = function (a) { // скрытие окна Jira по двойному клику
    if (checkelementtype(a)) { document.getElementById('AF_Jira').style.display = 'none'; }
}

    document.getElementById('hideMej').onclick = function () { // скрытие окна поиска по Jira
        if (document.getElementById('AF_Jira').style.display == '')
            document.getElementById('AF_Jira').style.display = 'none'
    }
	
	document.getElementById('ClearJiraData').onclick = function () {  // функция очистки полей в форме
		document.getElementById('testJira').value = '';
		document.getElementById('issuetable').innerText = '';
     }

    document.getElementById('jirainstr').onclick = function () {
      window.open('https://confluence.skyeng.tech/pages/viewpage.action?pageId=140564971#id-%F0%9F%A7%A9%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D0%B5ChatMasterAutoFaq-jirasearch%F0%9F%94%8EJiraSearch')
    }

    document.getElementById('jirafinder').onclick = function () { // открывает поле для работой с JIRA поиском
        if (document.getElementById('AF_Jira').style.display == 'none') {
            document.getElementById('AF_Jira').style.display = ''
            document.getElementById('idmymenucrm').style.display = 'none'

            let defqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype in (Bug, Task) AND status != closed AND Reports > 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY updated`
            document.getElementById('JQLquery').innerText = defqueryitem;
            let frqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype = Bug AND status != closed AND Reports >= 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY Created`
            let customquery = '';
            let iosbugsqueryitem = '';
            let androidbugsqueryitem = '';

            let jiratkn;

            function checkJiraToken() { //функция проверки авторизации в jira
                document.getElementById('responseTextarea1').value = '{}'
                document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/"
                document.getElementById('responseTextarea3').value = 'getjiratoken'
                document.getElementById('sendResponse').click()

                document.getElementById("responseTextarea1").addEventListener("DOMSubtreeModified", function () {
                    jiratkn = document.getElementById('responseTextarea1').getAttribute('getjiratoken');
                    if (jiratkn != null) {
                        if (jiratkn.match(/name="atlassian-token" content="(.*lin)/) != null) {
                            jiratkn = jiratkn.match(/name="atlassian-token" content="(.*lin)/)[1];
                            document.getElementById('searchjiratknstatus').innerText = "🟢"
                            console.log("TOKEN: " + jiratkn);
                        } else {
                            alert("Авторизуйтесь в системе Jira, чтобы при поиске запрос был отправлен");
                            document.getElementById('searchjiratknstatus').innerText = "🔴"
                        }
                        document.getElementById('responseTextarea1').removeAttribute('getjiratoken');

                    }
                })
            }

            checkJiraToken()

            document.getElementById('RefreshJiraStatus').onclick = checkJiraToken() // функция повторной проверки авторизации в Jira
            let favissues = [];

            document.getElementById('defaultQuery').onclick = function () { // если выбрана default
                defqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype in (Bug, Task) AND status != closed AND Reports > 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY updated`
                document.getElementById('JQLquery').value = defqueryitem;
                document.getElementById('testJira').value = ""
                this.classList.toggle('active-query')
                document.getElementById('getiosbugs').classList.remove('active-query')
                document.getElementById('getandroidbugs').classList.remove('active-query')
                document.getElementById('freshQuery').classList.remove('active-query')
                document.getElementById('customQuery').classList.remove('active-query')
                document.getElementById('favouriteBugs').classList.remove('active-query')
                document.getElementById('issuetable').style.display = ""
                document.getElementById('testJira').style.display = ""
                document.getElementById('getJiraTasks').style.display = ""
                document.getElementById('favouriteissuetable').style.display = "none"
            }

            document.getElementById('getiosbugs').onclick = function () { // если выбрана ios
                document.getElementById('testJira').value = "ios"
                this.classList.toggle('active-query')
                document.getElementById('getandroidbugs').classList.remove('active-query')
                document.getElementById('defaultQuery').classList.remove('active-query')
                document.getElementById('freshQuery').classList.remove('active-query')
                document.getElementById('customQuery').classList.remove('active-query')
                document.getElementById('favouriteBugs').classList.remove('active-query')
                document.getElementById('issuetable').style.display = ""
                document.getElementById('testJira').style.display = ""
                document.getElementById('getJiraTasks').style.display = ""
                document.getElementById('favouriteissuetable').style.display = "none"
                document.getElementById('getJiraTasks').click()
            }

            document.getElementById('getandroidbugs').onclick = function () { // если выбрана android
                document.getElementById('testJira').value = "android"
                this.classList.toggle('active-query')
                document.getElementById('getiosbugs').classList.remove('active-query')
                document.getElementById('defaultQuery').classList.remove('active-query')
                document.getElementById('freshQuery').classList.remove('active-query')
                document.getElementById('customQuery').classList.remove('active-query')
                document.getElementById('favouriteBugs').classList.remove('active-query')
                document.getElementById('issuetable').style.display = ""
                document.getElementById('testJira').style.display = ""
                document.getElementById('getJiraTasks').style.display = ""
                document.getElementById('favouriteissuetable').style.display = "none"
                document.getElementById('getJiraTasks').click()
            }

            document.getElementById('freshQuery').onclick = function () {  // если выбрана fresh
                frqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype = Bug AND status != closed AND Reports >= 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY Created`
                document.getElementById('JQLquery').value = frqueryitem;
                document.getElementById('testJira').value = ""
                this.classList.toggle('active-query')
                document.getElementById('getiosbugs').classList.remove('active-query')
                document.getElementById('getandroidbugs').classList.remove('active-query')
                document.getElementById('defaultQuery').classList.remove('active-query')
                document.getElementById('customQuery').classList.remove('active-query')
                document.getElementById('favouriteBugs').classList.remove('active-query')
                document.getElementById('issuetable').style.display = ""
                document.getElementById('testJira').style.display = ""
                document.getElementById('getJiraTasks').style.display = ""
                document.getElementById('favouriteissuetable').style.display = "none"
            }

            document.getElementById('customQuery').onclick = function () { // если выбрана custom
                document.getElementById('JQLquery').oninput = function () {
                    localStorage.setItem('customquery', this.value)
                }
                document.getElementById('JQLquery').value = localStorage.getItem('customquery');
                document.getElementById('testJira').value = ""
                this.classList.toggle('active-query')
                document.getElementById('getiosbugs').classList.remove('active-query')
                document.getElementById('getandroidbugs').classList.remove('active-query')
                document.getElementById('freshQuery').classList.remove('active-query')
                document.getElementById('defaultQuery').classList.remove('active-query')
                document.getElementById('favouriteBugs').classList.remove('active-query')
                document.getElementById('issuetable').style.display = ""
                document.getElementById('testJira').style.display = ""
                document.getElementById('getJiraTasks').style.display = ""
                document.getElementById('favouriteissuetable').style.display = "none"
            }

            document.getElementById('favouriteBugs').onclick = function () { // если выбрана ❤ favourite
                if (document.getElementById('favouriteissuetable').style.display != "") {
                    document.getElementById('issuetable').style.display = "none"
                    document.getElementById('favouriteissuetable').style.display = ""
                    document.getElementById('getiosbugs').classList.remove('active-query')
                    document.getElementById('getandroidbugs').classList.remove('active-query')
                    document.getElementById('testJira').style.display = "none"
                    document.getElementById('getJiraTasks').style.display = "none"
                    if (localStorage.getItem('bugsarray') != null || localStorage.getItem('bugsarray') != undefined) {
                        favissues = JSON.parse(localStorage.getItem('bugsarray'))
                        document.getElementById('favouriteissuetable').innerHTML = favissues;
                    }

                    for (let i = 0; i < document.getElementsByName('removefromfavourites').length; i++) {
                        document.getElementsByName('removefromfavourites')[i].onclick = function () {
                            favissues.splice([i], 1)
                            localStorage.setItem('bugsarray', JSON.stringify(favissues))
                            favissues = JSON.parse(localStorage.getItem('bugsarray'))
                            document.getElementById('favouriteissuetable').innerHTML = favissues;
                            removebug();
                            plusonecount()
                        }
                    }

                    function removebug() {
                        let arroffavbugs = document.getElementsByName('removefromfavourites');
                        for (let i = 0; i < arroffavbugs.length; i++) {
                            arroffavbugs[i].onclick = function () {
                                favissues.splice([i], 1)
                                localStorage.setItem('bugsarray', JSON.stringify(favissues))
                                favissues = JSON.parse(localStorage.getItem('bugsarray'))
                                document.getElementById('favouriteissuetable').innerHTML = favissues;
                                removebug();
                                plusonecount()
                            }
                        }
                    }
					
                    let cnttoincrease = document.getElementsByName('increasecount');
                    let itarrs = document.getElementsByName('favissuemassive')
                    for (let c = 0; c < cnttoincrease.length; c++) {
                        cnttoincrease[c].onclick = plusonecount;
                    }

                    function plusonecount() {
                        let cnttoincrease = document.getElementsByName('increasecount');
                        let itarrs = document.getElementsByName('favissuemassive')
                        for (let c = 0; c < cnttoincrease.length; c++) {
                            cnttoincrease[c].onclick = function () {
                                console.log('clicked')

                                document.getElementById('responseTextarea1').value = '{}'
                                document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/secure/AjaxIssueEditAction!default.jspa?decorator=none&issueId=" + itarrs[c].innerText
                                document.getElementById('responseTextarea3').value = 'suptabcnt'
                                document.getElementById('sendResponse').click()

                                let count;
                                let jira_token;
                                let increasedcount;
                                setTimeout(async function () {

                                    let repcount = document.getElementById('responseTextarea1').getAttribute('suptabcnt')
                                    repcount = await repcount;
                                    jira_token = repcount.match(/"atl_token":"(.*lin)/)[1]
                                    document.getElementById('responseTextarea1').removeAttribute('suptabcnt')

                                    count = repcount.match(/customfield_15410.*?value=.*?(\d+)/)[1];
                                    count = parseInt(count);
                                    increasedcount = count + 1;
                                    increasedcount = increasedcount.toString();
                                    console.log("count=" + count + " increasedcount " + increasedcount);

                                    setTimeout(function () {

                                        document.getElementById('responseTextarea1').value = `{
											"headers": {
												"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
												"sec-fetch-mode": "cors",
												"sec-fetch-site": "same-origin",
												"x-requested-with": "XMLHttpRequest",
												"x-sitemesh-off": "true"
														},
											"body": "customfield_15410=${increasedcount}&issueId=${itarrs[c].innerText}&atl_token=${jira_token}&singleFieldEdit=true&fieldsToForcePresent=customfield_15410",
											  "method": "POST",
											  "mode": "cors",
											  "credentials": "include"
												}`
                                        document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/secure/AjaxIssueAction.jspa?decorator=none"
                                        document.getElementById('responseTextarea3').value = ''
                                        document.getElementById('sendResponse').click()

                                        alert(`Support Tab для задачи ${document.getElementsByName('favbugs')[c].href} увеличен на 1 и сейчас равен: ${increasedcount}`)
                                    }, 1000);
                                }, 1000)
                            }
                        }
                    }


                    this.classList.toggle('active-query')
                    document.getElementById('freshQuery').classList.remove('active-query')
                    document.getElementById('defaultQuery').classList.remove('active-query')
                    document.getElementById('customQuery').classList.remove('active-query')
                } else {
                    document.getElementById('issuetable').style.display = "none"
                    document.getElementById('favouriteissuetable').style.display = "none"
                    document.getElementById('favouriteBugs').classList.remove('active-query')
                }
            }


            document.getElementById('getJiraTasks').onclick = function () {

                let rezissuetable;

                if (document.getElementById('defaultQuery').classList.contains('active-query')) {
                    defqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype in (Bug, Task) AND status != closed AND Reports > 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY updated`
                    document.getElementById('JQLquery').value = defqueryitem;
                    defqueryitem = document.getElementById('JQLquery').value.replaceAll(' ', '+').replaceAll(',', '%2C').replaceAll('=', '%3D').replaceAll('>', '%3E').replaceAll('"', '%22').replaceAll('<', '%3C')

                    document.getElementById('responseTextarea1').value = `{
                     "headers": {
                        "__amdmodulename": "jira/issue/utils/xsrf-token-header",
                       "accept": "*/*",
                        "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "x-atlassian-token": "no-check",
                       "x-requested-with": "XMLHttpRequest"
                     },
                     "body": "startIndex=0&filterId=21266&jql=${defqueryitem}&layoutKey=list-view",
                     "method": "POST",
                     "mode": "cors",
                     "credentials": "include"
					}`

                } else if (document.getElementById('freshQuery').classList.contains('active-query')) {
                    frqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype = Bug AND status != closed AND Reports >= 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY Created`
                    document.getElementById('JQLquery').value = frqueryitem;
                    frqueryitem = document.getElementById('JQLquery').value.replaceAll(' ', '+').replaceAll(',', '%2C').replaceAll('=', '%3D').replaceAll('>', '%3E').replaceAll('"', '%22').replaceAll('<', '%3C')

                    document.getElementById('responseTextarea1').value = `{
                     "headers": {
                        "__amdmodulename": "jira/issue/utils/xsrf-token-header",
                       "accept": "*/*",
                        "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "x-atlassian-token": "no-check",
                       "x-requested-with": "XMLHttpRequest"
                     },
                     "body": "startIndex=0&filterId=21266&jql=${frqueryitem}&layoutKey=list-view",
                     "method": "POST",
                     "mode": "cors",
                     "credentials": "include"
					}`

                } else if (document.getElementById('customQuery').classList.contains('active-query')) {
                    customquery = `${localStorage.getItem('customquery')}`
                    document.getElementById('JQLquery').value = customquery
                    customquery = document.getElementById('JQLquery').value.replaceAll(' ', '+').replaceAll(',', '%2C').replaceAll('=', '%3D').replaceAll('>', '%3E').replaceAll('"', '%22').replaceAll('<', '%3C')
                    document.getElementById('responseTextarea1').value = `{
                     "headers": {
                        "__amdmodulename": "jira/issue/utils/xsrf-token-header",
                       "accept": "*/*",
                        "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "x-atlassian-token": "no-check",
                       "x-requested-with": "XMLHttpRequest"
                     },
                     "body": "startIndex=0&filterId=21266&jql=${customquery}&layoutKey=list-view",
                     "method": "POST",
                     "mode": "cors",
                     "credentials": "include"
					}`

                } else if (document.getElementById('getiosbugs').classList.contains('active-query')) {
                    iosbugsqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype = Bug AND status != closed AND Reports > 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY Created`
                    document.getElementById('JQLquery').value = iosbugsqueryitem;
                    iosbugsqueryitem = document.getElementById('JQLquery').value.replaceAll(' ', '+').replaceAll(',', '%2C').replaceAll('=', '%3D').replaceAll('>', '%3E').replaceAll('"', '%22').replaceAll('<', '%3C')

                    document.getElementById('responseTextarea1').value = `{
                     "headers": {
                        "__amdmodulename": "jira/issue/utils/xsrf-token-header",
                       "accept": "*/*",
                        "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "x-atlassian-token": "no-check",
                       "x-requested-with": "XMLHttpRequest"
                     },
                     "body": "startIndex=0&filterId=21266&jql=${iosbugsqueryitem}&layoutKey=list-view",
                     "method": "POST",
                     "mode": "cors",
                     "credentials": "include"
					}`

                } else if (document.getElementById('getandroidbugs').classList.contains('active-query')) {
                    androidbugsqueryitem = `project in (VIM, MP, MV, KIDS, TS, ADULT, AUTH, BILL, COMM, KG, KIDSMOB, MATH, MOBACK, MOBT, SS, ST, SMMOB, STUDCAB, ESM, VID) AND issuetype = Bug AND status != closed AND Reports > 0 AND resolution in (Unresolved, Incomplete, "Cannot Reproduce") AND text ~ "${testJira.value}" ORDER BY Created`
                    document.getElementById('JQLquery').value = androidbugsqueryitem;
                    androidbugsqueryitem = document.getElementById('JQLquery').value.replaceAll(' ', '+').replaceAll(',', '%2C').replaceAll('=', '%3D').replaceAll('>', '%3E').replaceAll('"', '%22').replaceAll('<', '%3C')

                    document.getElementById('responseTextarea1').value = `{
                     "headers": {
                        "__amdmodulename": "jira/issue/utils/xsrf-token-header",
                       "accept": "*/*",
                        "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "x-atlassian-token": "no-check",
                       "x-requested-with": "XMLHttpRequest"
                     },
                     "body": "startIndex=0&filterId=21266&jql=${androidbugsqueryitem}&layoutKey=list-view",
                     "method": "POST",
                     "mode": "cors",
                     "credentials": "include"
					}`
                }

                document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/rest/issueNav/1/issueTable"
                document.getElementById('responseTextarea3').value = 'getissuetable'
                document.getElementById('sendResponse').click()

                function getJiraTask() {
                    rezissuetable = JSON.parse(document.getElementById('responseTextarea1').getAttribute('getissuetable'))
                    if (rezissuetable == null)
                        setTimeout(getJiraTask, 1000)
                    else {
                        //   rezissuetable = JSON.parse(rezissuetable)
                        document.getElementById('responseTextarea1').removeAttribute('getissuetable')
                        let issues = [];
                        let temporarka;
                        if (rezissuetable.issueTable.issueKeys.length > 50)
                            rezissuetable.issueTable.issueKeys.length = 50;
                        for (let i = 0; i < rezissuetable.issueTable.issueKeys.length; i++) {

                            if (rezissuetable.issueTable.issueKeys[i] != undefined) {

                                if (rezissuetable.issueTable.table.match(/(\w+-\d+">.*?).<\/a>/gmi).filter(function (item, index, array) { if (index % 2 != 0) return item; })[i].replace('">', ' – ').toLowerCase().indexOf(document.getElementById('testJira').value.toLowerCase()) != -1) {
                                    temporarka = rezissuetable.issueTable.table.match(/(\w+-\d+">.*?).<\/a>/gmi).filter(function (item, index, array) { if (index % 2 != 0) return item; })[i].replace('">', ' – ').replace(new RegExp(document.getElementById('testJira').value, 'i'), `<span style="color:MediumSpringGreen; font-weight:700; text-shadow:1px 2px 5px rgb(0 0 0 / 55%);">${document.getElementById('testJira').value.toUpperCase()}</span>`)
                                } else {
                                    temporarka = rezissuetable.issueTable.table.match(/(\w+-\d+">.*?).<\/a>/gmi).filter(function (item, index, array) { if (index % 2 != 0) return item; })[i].replace('">', ' – ')
                                }


                                issues += '<span style="color: #00FA9A">&#5129;</span>' + `<img src="${rezissuetable.issueTable.table.match(/https:\/\/jira.skyeng.tech\/images\/icons\/priorities\/.*svg/gm)[i]}" style="width:20px; height:25px;" title="Приоритеты: ⛔ - Blocker, полностью залитая красная стрелка вверх - Critical, три красные стрелки вверх - Major, три синие вниз - Minor, ⭕ - Trivial">` + ' ' + '<span class="newcount" style="width:20px; margin-left: 5px; background:#3CB371; padding:2px; padding-left:6px; font-weight:700; border-radius:10px;">' + rezissuetable.issueTable.table.match(/(">.)*?([0-9]+)\n/gm)[i] + '</span>' + `<a name="buglinks" href="https://jira.skyeng.tech/browse/${rezissuetable.issueTable.issueKeys[i]}" onclick="" target="_blank" style="margin-left:5px; color: #ffe4c4">` + temporarka + '</a>' + `<span name="issueIds" style="display:none">${rezissuetable.issueTable.issueIds[i]}` + '</span>' + '<span class = "refreshissues" style="color:#ADFF2F; margin-left: 5px; cursor: pointer">&#69717;&#120783;</span>' + '<span name="addtofavourites" style="cursor:pointer;" title="Добавить задачу в Избранное">🤍</span>' + '</br>'

                            }

                        }

                        document.getElementById('issuetable').innerHTML = issues;

                        let addtofarr = document.getElementsByName('addtofavourites')
                        let tagsarray = document.getElementsByName('buglinks');
                        let massivissueids = document.getElementsByName('issueIds')
                        for (let v = 0; v < addtofarr.length; v++) {
                            addtofarr[v].onclick = function () {
                                addtofarr[v].innerText = "❤"
                                // addtofarr[v].style = "color: transparent; text-shadow: rgb(255 0 0) 1px 0px 1px, rgb(0 0 0) 0px 1px 1px, rgb(0 0 0) -1px 0px 1px, rgb(0 0 0) 0px -1px 1px;"
                                for (let x = 0; x < tagsarray.length; x++) {
                                    if (x == v) {
                                        favissues.push('<span style="color: #00FA9A">&#5129;</span>' + `<a name="favbugs" href="${tagsarray[x].href}" target="_blank" style="color:bisque;">` + tagsarray[x].innerHTML + '</a>' + `<span name="favissuemassive" style="display:none">${massivissueids[x].innerText}` + '</span>' + '<span name="removefromfavourites" style="cursor:pointer;" title="Удалить задачу из Избранного">❌</span>' + '<span name = "increasecount" style="color:#ADFF2F; margin-left: 5px; cursor: pointer">&#69717;&#120783;</span>' + '<br>')
                                        localStorage.setItem('bugsarray', JSON.stringify(favissues))
                                    }
                                }
                            }
                        }

                        let refreshissuesarr = document.querySelectorAll('.refreshissues');
                        for (let f = 0; f < refreshissuesarr.length; f++) {
                            refreshissuesarr[f].onclick = function () {

                                document.getElementById('responseTextarea1').value = '{}'
                                document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/secure/AjaxIssueEditAction!default.jspa?decorator=none&issueId=" + rezissuetable.issueTable.issueIds[f]
                                document.getElementById('responseTextarea3').value = 'reportscount'
                                document.getElementById('sendResponse').click()

                                let count;
                                let jira_token;
                                let increasedcount;
                                setTimeout(async function () {

                                    let repcount = document.getElementById('responseTextarea1').getAttribute('reportscount')
                                    repcount = await repcount;
                                    jira_token = repcount.match(/"atl_token":"(.*lin)/)[1]
                                    document.getElementById('responseTextarea1').removeAttribute('reportscount')

                                    count = repcount.match(/customfield_15410.*?value=.*?(\d+)/)[1];
                                    count = parseInt(count);
                                    increasedcount = count + 1;
                                    increasedcount = increasedcount.toString();
                                    console.log("count=" + count + " increasedcount " + increasedcount);

                                    setTimeout(function () {

                                        document.getElementById('responseTextarea1').value = `{
										"headers": {
											"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
											"sec-fetch-mode": "cors",
											"sec-fetch-site": "same-origin",
											"x-requested-with": "XMLHttpRequest",
											"x-sitemesh-off": "true"
													},
										"body": "customfield_15410=${increasedcount}&issueId=${rezissuetable.issueTable.issueIds[f]}&atl_token=${jira_token}&singleFieldEdit=true&fieldsToForcePresent=customfield_15410",
										  "method": "POST",
										  "mode": "cors",
										  "credentials": "include"
											}`
                                        document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/secure/AjaxIssueAction.jspa?decorator=none"
                                        document.getElementById('responseTextarea3').value = ''
                                        document.getElementById('sendResponse').click()
                                        let newinfocount = document.querySelectorAll('.newcount');
                                        newinfocount[f].innerHTML = increasedcount;
                                        increasedcount = "";
                                    }, 1000);
                                }, 1000)
                            }
                        }

                        console.log(rezissuetable.issueTable.issueKeys);
                        setTimeout(function () { issues = []; }, 5000)
                    }
                }

                setTimeout(getJiraTask, 1000)

            }
            // Просмотр таски по джира по ее коду и номеру
            document.getElementById('getJiraTasks').ondblclick = function () {
                if (document.getElementById('AF_Jira').style.display == 'none') {
                    document.getElementById('AF_Jira').style.display = ''
                }

                let rezissuetable;

                document.getElementById('responseTextarea1').value = `{}`
                document.getElementById('responseTextarea2').value = "https://jira.skyeng.tech/rest/quicksearch/1.0/productsearch/search?q=" + document.getElementById('testJira').value;
                document.getElementById('responseTextarea3').value = 'getissuetable1'
                document.getElementById('sendResponse').click()

                async function getJiraTask1() {

                    rezissuetable = JSON.parse(document.getElementById('responseTextarea1').getAttribute('getissuetable1'))
                    rezissuetable = await rezissuetable;
                    document.getElementById('responseTextarea1').removeAttribute('getissuetable1')
                    if (rezissuetable != null) {
                        let issues = [];
                        issues = '<span style="color: #00FA9A">&#5129;</span>' + '<a href="' + rezissuetable[0].items[0].url + '" onclick="" target="_blank" style="color: #ffe4c4">' + rezissuetable[0].items[0].subtitle + " - " + rezissuetable[0].items[0].title + '</a>' 

                        document.getElementById('issuetable').innerHTML = issues;

                        setTimeout(function () { issues = []; testJira.value = ""; }, 5000)
                    }
                }

                setTimeout(getJiraTask1, 1000)
            }

            let searchJiraByEnter = document.querySelector('#testJira'); //по Enter запускает поиск по Jira
            searchJiraByEnter.addEventListener('keydown', event => {
                if (event.key === "Enter") {
                    document.querySelector('#getJiraTasks').click()
                }
            })

            let searchJiraByEnterInput = document.querySelector('#JQLquery'); //по Enter запускает поиск по Jira
            searchJiraByEnterInput.addEventListener('keydown', event => {
                if (event.key === "Enter") {
                    document.querySelector('#getJiraTasks').click()
                }
            })


        } else if (document.getElementById('AF_Jira').style.display == '') {
            document.getElementById('AF_Jira').style.display = 'none'
            document.getElementById('idmymenucrm').style.display = 'none'
        }
    }