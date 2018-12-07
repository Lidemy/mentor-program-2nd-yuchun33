import { markdown } from 'markdown'

export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month  + hour + ':' + min ;
    return {
        'date': date,
        'month': month,
        'hour': hour,
        'min': min
    };
  }



export function createMarkup(body) {
    const markdownBody = markdown.toHTML( ''+ body +'' ) //要加''，但不知道為何
    return {__html: markdownBody};
}