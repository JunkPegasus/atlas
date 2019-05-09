var activeObjectList = -1;

$(document).ready(function() {
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
    var html = "";
    $('#subgrid .row:not(.header)').remove();
    objectList[index].items.forEach((elm) => {
        if (elm.public == "1") {
            html += '<div class="row"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status public">Öffentlich</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
        } else {
            html += '<div class="row"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status hidden">Versteckt</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
        }
    })
    $('#subgrid').append(html);
    activeObjectList = index;
}

function searchObject(elm) {
    var tmpList = []
    var value = $(elm).val().trim().toLowerCase();
    if (value != "") {
        objectList[activeObjectList].items.forEach((obj) => {
            var compareValue = obj.name.toLowerCase();
            if (compareValue.includes(value)) {
                tmpList.push(obj);
            }
        })
        var html = "";
        $('#subgrid .row:not(.header)').remove();
        tmpList.forEach((elm) => {
            if (elm.public == "1") {
                html += '<div class="row"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status public">Öffentlich</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
            } else {
                html += '<div class="row"><div class="column column-1">' + elm.name + '</div><div class = "column column-2">' + elm.views + '</div><div class="column column-3"><div class="status hidden">Versteckt</div></div><div class="column column-4"> ' + elm.dateChanged.split(" ")[0] + ' </div><div class="column column-5"> ' + elm.userChanged + '</div> <div class="column column-6"> ' + elm.dateCreated.split(" ")[0] + '</div><div class="column column-7">' + elm.userCreated + '</div></div>'
            }
        })
        $('#subgrid').append(html);
    } else {
        if (activeObjectList > -1) {
            showObjectList(activeObjectList);
        }
    }
}