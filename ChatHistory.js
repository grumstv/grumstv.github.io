let buttonhistory = document.createElement('p');
buttonhistory.id = 'lookForHistory';
buttonhistory.innerHTML = '<a style="color: black; cursor: pointer;">Chat History📋</a>';
let buttonnextstudentid = document.createElement('p');
buttonnextstudentid.id = 'nextStudentIdChatHistory';
buttonnextstudentid.innerHTML = '<a style="color: black; cursor: pointer;">Chat History📋(У)</a>';
let buttonnextteacherid = document.createElement('p');
buttonnextteacherid.id = 'nextTeacherIdChatHistory';
buttonnextteacherid.innerHTML = '<a style="color: black; cursor: pointer;">Chat History📋(П)</a>';

buttonhistory.onclick = function () { //функция приска пр истории чатов в коте
if (document.querySelector('#hide_or_display').textContent != "свернуть") {
    hide_or_display.click()
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "id")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText.split(' ')[0]
    }
    search.click()
} else if (document.querySelector('#hide_or_display').textContent == "свернуть") {
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "id")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText.split(' ')[0]
    }
	search.click()
}
}

buttonnextstudentid.onclick = function () {
	if (document.querySelector('#hide_or_display').textContent != "свернуть") {
    hide_or_display.click()
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "nextClass-studentId")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText
    }
	search.click()
 } else if (document.querySelector('#hide_or_display').textContent == "свернуть") {
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "nextClass-studentId")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText
    }
	search.click()
}
}

buttonnextteacherid.onclick = function () {
	if (document.querySelector('#hide_or_display').textContent != "свернуть") {
    hide_or_display.click()
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "nextClass-teacherId")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText
    }
	search.click()
 } else if (document.querySelector('#hide_or_display').textContent == "свернуть") {
    for (i = 0; document.getElementsByClassName('expert-user_details-list')[1].childNodes[i] != undefined; i++) {
        if (document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].firstChild.innerText == "nextClass-teacherId")
            document.getElementById('user_id').value = document.getElementsByClassName('expert-user_details-list')[1].childNodes[i].childNodes[1].innerText
    }
	search.click()
}
}