var eventList = {}
var num = 0
$(function(){
    $('form').submit(function(event){
        if($('#newMission').val()){
            eventList[num] = {}
            eventList[num].content = $('#newMission').val()
            eventList[num].finish = false
            num ++
            $('#newMission').val("")
        }
        event.preventDefault();
        render(num, eventList)
    })
    $('.lists').on('change','input',function(){
        if(eventList[$(this).val()].finish){
            eventList[$(this).val()].finish = false
        } else {
            eventList[$(this).val()].finish = true
        }
    })
})

function render(num, eventList){
    $('.lists').empty()
    for(var key in eventList){
        var mission = $("<div class='mission'></div>") 
        var label = $(`<label class='missionContent' for='checkbox${key}'></label>`)
        label.append(eventList[key].content)
        if(eventList[key].finish){
            label.append(`<input type='checkbox' id='checkbox${key}' value='${key}' checked>`)
        } else {
            label.append(`<input type='checkbox' id='checkbox${key}' value='${key}'>`)
        }
        label.append("<span class='checkmark'></span>")
        mission.append(label)
        mission.append(`<button onclick="remove(${key}, eventList)"> X </button>`)
        $('.lists').append(mission)    
    }
}

function remove(_i){
    delete eventList[_i]
    render(num, eventList)
}

function objLength(obj){
    var length = 0
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            length ++
        }
    }
    return length
}