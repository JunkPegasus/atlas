$(document).ready(function() {
    var item
    try {
        item = JSON.parse(localStorage.object)
    } catch (e) {
        console.log(e)
    }
    
    if(item !== undefined) {
        var html = ""
        var fields = item.data.fields
        var images = item.data.images
        $('#title').html(item.name)
        fields.forEach((field) => {
            var id = "obj" + field.id
            if(field.type === "text"){
                html += '<div class="input"><div class="name">'+field.name+'</div><input value="'+field.value+'" type="text" id="'+id+'" placeholder="'+field.name+'"></div>'
            } else if(field.type === "textarea") {
                html += '<div class="input"><div class="name">'+field.name+'</div><textarea id="'+id+'" placeholder="'+field.name+'">'+field.value+'</textarea></div>'
            }
        });
        $('.dataContainer .input').remove()
        $('.dataContainer').append(html)
        
    }
})