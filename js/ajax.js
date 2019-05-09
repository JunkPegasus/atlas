var objectList;

function loginUserRequest(username, password) {
    $.post({
        url: "https://elj-nn.de/oms/Services/LoginServiceAtlas.php",
        data: {
            username: username,
            password: password,
            session: "atlasSession"
        },
        success: function(response) {
            var bTry = true;
            try {
                response = JSON.parse(response);
            } catch (e) {
                bTry = false;
                console.log(e);
            }
            if (bTry) {
                if (response.success == true) {
                    createSecondWindow()
                } else {
                    if (response.data == 1) {
                        $('.loginErrorText').addClass("show");
                        $('.loginErrorText').html("Benutzer existiert nicht, Passwort falsch oder nicht ausreichend Berechtigung.");
                    }
                }
            }
        }
    });
}

function getObjectList() {
    $.post({
        url: "https://elj-nn.de/oms/Services/ObjectServiceAtlas.php",
        data: {
            request: "objectList",
            session: "atlasSession"
        },
        success: function(response) {
            var bTry = true;
            try {
                response = JSON.parse(response);
            } catch (e) {
                console.log(e);
                bTry = false;
            }
            if (bTry) {
                if (response.success == true) {
                    objectList = response.data;
                    loadObjectSubList();
                }
            }
        }

    });
}

function loadObjectSubList() {
    if (objectList !== undefined) {
        for (var i = 0; i < objectList.length; i++) {
            getObjectSubList(objectList[i].id, i)
        }
    }
}

function getObjectSubList(id, i) {
    $.post({
        url: "https://elj-nn.de/oms/Services/ObjectServiceAtlas.php",
        data: {
            request: "objectSubList",
            listId: id,
            session: "atlasSession"
        },
        success: function(response) {
            var bTry = true;
            try {
                response = JSON.parse(response);
            } catch (e) {
                console.log(e);
                bTry = false;
            }
            if (bTry) {
                if (response.success == true) {
                    objectList[i].items = response.data;
                    loadObjects(i);
                }
            }
        }

    });
}

function loadObjects(i) {
    for (var k = 0; k < objectList[i].items.length; k++) {
        getObject(objectList[i].items[k].id, i, k);
    }
    showObjects();
}


function getObject(id, i, k) {
    $.post({
        url: "https://elj-nn.de/oms/Services/ObjectServiceAtlas.php",
        data: {
            request: "object",
            objId: id,
            session: "atlasSession"
        },
        success: function(response) {
            var bTry = true;
            try {
                response = JSON.parse(response);
            } catch (e) {
                console.log(e);
                bTry = false;
            }
            if (bTry) {
                if (response.success == true) {
                    objectList[i].items[k].data = response.data;
                }
            }
        }

    });
}