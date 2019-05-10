var activeObjectList = -1;
var searchList = [];


$(document).ready(function() {

    $('.nav_label').html(localStorage.user)
    getObjectList();
})

function showObjects() {
    var html = "";
    var counter = 0;
    objectList.forEach((obj) => {
        html += '<div class="item" onclick="showObjectList(' + counter + ')"><div class="name">' + obj.name + '</div></div>';
        counter++;
    })
    $('#objectlist').html(html);
}

function showObjectList(index) {
    var html = ""
    $('#subgrid .row:not(.header)').remove()
    var counter = 0
    objectList[index].items.forEach((elm) => {
        if (elm.public == "1") {
            html += '<div class="row" onclick="workWithObject(' + index + ',' + counter + ')"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status public">Sichtbar</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
        } else {
            html += '<div class="row" onclick="workWithObject(' + index + ',' + counter + ')"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status hidden">Versteckt</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
        }
        counter++
    })
    $('#subgrid').append(html);
    activeObjectList = index;
}

function searchObject(elm) {
    searchList = [];
    var value = $(elm).val().trim().toLowerCase();
    if (value != "") {
        objectList[activeObjectList].items.forEach((obj) => {
            var compareValue = obj.name.toLowerCase();
            if (compareValue.includes(value)) {
                searchList.push(obj);
            }
        })
        var html = "";
        $('#subgrid .row:not(.header)').remove();
        var counter = 0;
        searchList.forEach((elm) => {
            if (elm.public == "1") {
                html += '<div class="row" onclick="workWithSearchObject(' + counter + ')"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status public">Sichtbar</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
            } else {
                html += '<div class="row" onclick="workWithSearchObject(' + counter + ')"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status hidden">Versteckt</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
            }
            counter++
        })
        $('#subgrid').append(html);
    } else {
        if (activeObjectList > -1) {
            showObjectList(activeObjectList);
        }
    }
}

function workWithObject(i, k) {
    localStorage.object = JSON.stringify(objectList[i].items[k])
    createObjectEditWindow()
}

function workWithSearchObject(i) {
    localStorage.object = JSON.stringify(searchList[i])
    createObjectEditWindow()
}