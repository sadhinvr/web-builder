const b_URL = 'https://webflow-back-end.herokuapp.com';
const iframe = document.getElementById('iframe');
const d = {
    ibody:iframe.contentDocument,
    body:document.body,
}

const $ = function (q, a = false ,i = false) {
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


export {
    $,
    d,
    b_URL
};