const iframe = document.getElementById('iframe');

const domEle = {
    ibody:iframe.contentDocument,
    body:document.body,
    iresize:$('.iresize')
}

function $(q, a = false ,i = false) {
    if(i){

        if (a) {
            return d.ibody.querySelectorAll(q);
        }
        return d.ibody.querySelector(q);
    }

    if (a) {
        return document.querySelectorAll(q)
    }
    return document.querySelector(q);
}
