$(document).ready(function() {
    $('#username').focus()
    if(localStorage.user !== undefined) {
        $('#username').val(localStorage.user)
        $('#password').focus()
    }
})